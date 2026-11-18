import type { SetStateAction } from 'react';
import type { Binding } from '../utils/binding';

export type Key = string | symbol;

/** Recorded when a reader depends on every property, as `Object.keys` does. */
export const EVERY_KEY: unique symbol = Symbol('every key');

export type ObservationKind = 'object' | 'observable';

export interface Observation {
  readonly kind: ObservationKind;
  version: number;
  readonly listeners: Set<(key: Key) => void>;
  readonly subscribe: (listener: () => void) => () => void;
  readonly getVersion: () => number;
}

interface Scope {
  readonly observation: Observation;
  readonly read: (key: Key) => void;
  readonly wrap: (value: unknown, key: Key) => unknown;
  readonly bindings: Map<string, Binding<unknown>>;
  readonly nested: WeakMap<object, Map<Key, object>>;
}

interface Root {
  readonly observation: Observation;
  readonly canonical: object;
  readonly instance: object;
}

const roots = new WeakMap<object, Root>();
const raws = new WeakMap<object, object>();

let recorder: ((observation: Observation, key: Key) => void) | null = null;

function createObservation(kind: ObservationKind): Observation {
  const observation: Observation = {
    kind,
    version: 0,
    listeners: new Set(),
    subscribe: (listener) => {
      const onChange = () => listener();
      observation.listeners.add(onChange);
      return () => observation.listeners.delete(onChange);
    },
    getVersion: () => observation.version,
  };
  return observation;
}

// Announced before the value changes, like objectWillChange and willSet in Swift.
function willChange(observation: Observation, key: Key): void {
  observation.version += 1;
  observation.listeners.forEach((listener) => listener(key));
}

function recordRead(observation: Observation, key: Key): void {
  if (recorder && observation.kind === 'observable') recorder(observation, key);
}

export function withRecorder<T>(record: (observation: Observation, key: Key) => void, body: () => T): T {
  const previous = recorder;
  recorder = record;
  try {
    return body();
  } finally {
    recorder = previous;
  }
}

type Kind = 'data' | 'map' | 'set' | 'date';

function kindOf(value: unknown): Kind | null {
  if (value === null || typeof value !== 'object' || roots.has(value) || raws.has(value) || Object.isFrozen(value) || '$$typeof' in value) {
    return null;
  }
  if (value instanceof Map) return 'map';
  if (value instanceof Set) return 'set';
  if (value instanceof Date) return 'date';
  const prototype = Object.getPrototypeOf(value);
  return Array.isArray(value) || prototype === Object.prototype || prototype === null ? 'data' : null;
}

function unwrap(value: unknown): unknown {
  if (value === null || typeof value !== 'object') return value;
  return roots.get(value)?.canonical ?? raws.get(value) ?? value;
}

function nestedProxy(scope: Scope, value: object, key: Key): object {
  let byKey = scope.nested.get(value);
  if (!byKey) scope.nested.set(value, (byKey = new Map()));
  let proxy = byKey.get(key);
  if (!proxy) {
    const kind = kindOf(value);
    proxy = new Proxy(
      value,
      kind === 'data' ? dataHandler(scope, key) : kind === 'date' ? dateHandler(scope, key) : collectionHandler(scope, key, kind === 'map')
    );
    byKey.set(key, proxy);
    raws.set(proxy, value);
  }
  return proxy;
}

function readOnly(target: object, key: Key): boolean {
  const own = Reflect.getOwnPropertyDescriptor(target, key);
  return Boolean(own && !own.configurable && !own.writable);
}

function sameValue(previous: PropertyDescriptor | undefined, next: PropertyDescriptor): boolean {
  return Boolean(previous && 'value' in previous && 'value' in next && Object.is(previous.value, next.value));
}

function binding(scope: Scope, target: object, key: string, receiver: object): Binding<unknown> {
  let projected = scope.bindings.get(key);
  if (!projected) {
    projected = {
      get value() {
        return Reflect.get(target, key, receiver);
      },
      setValue: (action: SetStateAction<unknown>) => {
        const next = typeof action === 'function' ? (action as (previous: unknown) => unknown)(Reflect.get(target, key, receiver)) : action;
        Reflect.set(target, key, next, receiver);
      },
    } as Binding<unknown>;
    scope.bindings.set(key, projected);
  }
  return projected;
}

function rootHandler(scope: Scope): ProxyHandler<object> {
  return {
    get(target, key, receiver) {
      if (typeof key === 'string' && key.startsWith('$') && !(key in target)) {
        const name = key.slice(1);
        if (name in target && typeof Reflect.get(target, name, receiver) !== 'function') {
          scope.read(name);
          return binding(scope, target, name, receiver);
        }
      }
      const value = Reflect.get(target, key, receiver);
      if (typeof value === 'function') return value;
      scope.read(key);
      return readOnly(target, key) ? value : scope.wrap(value, key);
    },
    has(target, key) {
      scope.read(key);
      return Reflect.has(target, key);
    },
    ownKeys(target) {
      scope.read(EVERY_KEY);
      return Reflect.ownKeys(target);
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, unwrap(value), receiver);
    },
    defineProperty(target, key, descriptor) {
      if ('value' in descriptor) descriptor = { ...descriptor, value: unwrap(descriptor.value) };
      if (!sameValue(Reflect.getOwnPropertyDescriptor(target, key), descriptor)) willChange(scope.observation, key);
      return Reflect.defineProperty(target, key, descriptor);
    },
    deleteProperty(target, key) {
      if (Object.prototype.hasOwnProperty.call(target, key)) willChange(scope.observation, key);
      return Reflect.deleteProperty(target, key);
    },
  };
}

// A value inside a property belongs to that property: reading or changing it reads or changes the property.
function dataHandler(scope: Scope, owner: Key): ProxyHandler<object> {
  return {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      if (typeof value === 'function') return value;
      scope.read(owner);
      return readOnly(target, key) ? value : scope.wrap(value, owner);
    },
    has(target, key) {
      scope.read(owner);
      return Reflect.has(target, key);
    },
    ownKeys(target) {
      scope.read(owner);
      return Reflect.ownKeys(target);
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, unwrap(value), receiver);
    },
    defineProperty(target, key, descriptor) {
      if ('value' in descriptor) descriptor = { ...descriptor, value: unwrap(descriptor.value) };
      if (!sameValue(Reflect.getOwnPropertyDescriptor(target, key), descriptor)) willChange(scope.observation, owner);
      return Reflect.defineProperty(target, key, descriptor);
    },
    deleteProperty(target, key) {
      if (Object.prototype.hasOwnProperty.call(target, key)) willChange(scope.observation, owner);
      return Reflect.deleteProperty(target, key);
    },
  };
}

// Map and Set keep their contents in internal slots, so their methods must run on the target.
function collectionHandler(scope: Scope, owner: Key, isMap: boolean): ProxyHandler<object> {
  return {
    get(target, key, receiver) {
      const collection = target as Map<unknown, unknown> & Set<unknown>;
      const read = () => scope.read(owner);
      const wrap = (value: unknown) => (isMap ? scope.wrap(value, owner) : value);
      if (key === 'size') {
        read();
        return collection.size;
      }
      const method = Reflect.get(target, key, target);
      if (typeof method !== 'function') return method;
      switch (key) {
        case 'set':
          return (entryKey: unknown, value: unknown) => {
            const k = unwrap(entryKey);
            const v = unwrap(value);
            if (!(collection.has(k) && Object.is(collection.get(k), v))) willChange(scope.observation, owner);
            collection.set(k, v);
            return receiver;
          };
        case 'add':
          return (value: unknown) => {
            const v = unwrap(value);
            if (!collection.has(v)) willChange(scope.observation, owner);
            collection.add(v);
            return receiver;
          };
        case 'delete':
          return (entryKey: unknown) => {
            const k = unwrap(entryKey);
            if (collection.has(k)) willChange(scope.observation, owner);
            return collection.delete(k);
          };
        case 'clear':
          return () => {
            if (collection.size > 0) willChange(scope.observation, owner);
            collection.clear();
          };
        case 'get':
          return (entryKey: unknown) => {
            read();
            return wrap(collection.get(unwrap(entryKey)));
          };
        case 'has':
          return (entryKey: unknown) => {
            read();
            return collection.has(unwrap(entryKey));
          };
        case 'forEach':
          return (callback: (value: unknown, key: unknown, owner: unknown) => void, thisArg?: unknown) => {
            read();
            collection.forEach((value, entryKey) => callback.call(thisArg, wrap(value), entryKey, receiver));
          };
        case 'keys':
          return () => {
            read();
            return collection.keys();
          };
        case 'values':
          return function* () {
            read();
            for (const value of collection.values()) yield wrap(value);
          };
        case 'entries':
          return function* () {
            read();
            for (const [entryKey, value] of collection.entries()) yield [entryKey, wrap(value)];
          };
        case Symbol.iterator:
          return isMap
            ? function* () {
                read();
                for (const [entryKey, value] of collection.entries()) yield [entryKey, wrap(value)];
              }
            : function* () {
                read();
                yield* collection.values();
              };
        default:
          return (...args: unknown[]) => {
            read();
            return method.apply(target, args);
          };
      }
    },
  };
}

function dateHandler(scope: Scope, owner: Key): ProxyHandler<object> {
  return {
    get(target, key) {
      const date = target as Date;
      const method = Reflect.get(target, key, target);
      if (typeof method !== 'function') return method;
      if (typeof key === 'string' && key.startsWith('set')) {
        return (...args: unknown[]) => {
          const probe = new Date(date.getTime());
          method.apply(probe, args);
          if (!Object.is(probe.getTime(), date.getTime())) willChange(scope.observation, owner);
          return method.apply(date, args);
        };
      }
      return (...args: unknown[]) => {
        scope.read(owner);
        return method.apply(date, args);
      };
    },
  };
}

function canonicalScope(observation: Observation): Scope {
  const scope: Scope = {
    observation,
    read: (key) => recordRead(observation, key),
    wrap: (value, key) => (kindOf(value) ? nestedProxy(scope, value as object, key) : value),
    bindings: new Map(),
    nested: new WeakMap(),
  };
  return scope;
}

function makeRoot<T extends object>(instance: T, kind: ObservationKind): T {
  const observation = createObservation(kind);
  const proxy = new Proxy<T>(instance, rootHandler(canonicalScope(observation)));
  roots.set(proxy, { observation, canonical: proxy, instance });
  return proxy;
}

/**
 * The JavaScript `ObservableObject`: subclass it, and any change to its properties re-renders every
 * component observing it (`useStateObject`, `useObservedObject`, `useEnvironmentObject`).
 *
 * @example
 * class Session extends ObservableObject {
 *   name = 'Guest';
 *   signIn(name: string) { this.name = name; }
 * }
 */
export abstract class ObservableObject {
  constructor() {
    return makeRoot(this, 'object');
  }
}

/**
 * The JavaScript `@Observable` class: subclass it, and a component re-renders only when a property
 * it read changes (`useObservable`, `useBindable`, `useEnvironment`).
 *
 * @example
 * class Library extends Observable {
 *   books: Book[] = [];
 *   get count() { return this.books.length; }
 * }
 */
export abstract class Observable {
  constructor() {
    return makeRoot(this, 'observable');
  }
}

/** An observed object, with a `Binding` to each property under `$name`, like `$model.name` in Swift. */
export type Observed<T> = T & {
  readonly [K in keyof T as K extends string ? (T[K] extends (...args: never[]) => unknown ? never : `$${K}`) : never]: Binding<T[K]>;
};

/** What `@Bindable` gives in Swift: the object, read with tracking, and `$name` bindings. */
export type Bindable<T> = Observed<T>;

export type ObservableObjectType<T extends ObservableObject> = abstract new (...args: never[]) => T;
export type ObservableType<T extends Observable> = abstract new (...args: never[]) => T;

export function observationOf(object: object, kind?: ObservationKind): Observation {
  const observation = roots.get(object)?.observation;
  if (!observation || (kind && observation.kind !== kind)) {
    const expected = kind === 'observable' ? 'an Observable subclass' : kind === 'object' ? 'an ObservableObject subclass' : 'an ObservableObject or Observable subclass';
    throw new TypeError(`swiftui-react-native: expected an object of ${expected}.`);
  }
  return observation;
}

export function isObserved(value: unknown): value is object {
  return value !== null && typeof value === 'object' && roots.has(value);
}

/** The object behind a component's view of it, so it can be stored or compared. */
export function canonical<T extends object>(object: T): T {
  return (roots.get(object)?.canonical as T | undefined) ?? object;
}

export interface Tracker {
  readonly reads: Map<Observation, Set<Key>>;
  readonly subscriptions: Map<Observation, () => void>;
  readonly listeners: Set<() => void>;
  readonly views: WeakMap<object, object>;
  readonly scopes: Map<Observation, Scope>;
  version: number;
  open: boolean;
  readonly subscribe: (listener: () => void) => () => void;
  readonly getVersion: () => number;
}

export function createTracker(): Tracker {
  const tracker: Tracker = {
    reads: new Map(),
    subscriptions: new Map(),
    listeners: new Set(),
    views: new WeakMap(),
    scopes: new Map(),
    version: 0,
    open: false,
    subscribe: (listener) => {
      tracker.listeners.add(listener);
      return () => tracker.listeners.delete(listener);
    },
    getVersion: () => tracker.version,
  };
  return tracker;
}

function listen(tracker: Tracker, observation: Observation): void {
  if (tracker.subscriptions.has(observation)) return;
  const onChange = (key: Key) => {
    const keys = tracker.reads.get(observation);
    if (!keys || !(keys.has(key) || keys.has(EVERY_KEY))) return;
    tracker.version += 1;
    tracker.listeners.forEach((listener) => listener());
  };
  observation.listeners.add(onChange);
  tracker.subscriptions.set(observation, () => observation.listeners.delete(onChange));
}

export function trackRead(tracker: Tracker, observation: Observation, key: Key): void {
  let keys = tracker.reads.get(observation);
  if (!keys) tracker.reads.set(observation, (keys = new Set()));
  keys.add(key);
  listen(tracker, observation);
}

let swiftUIRenders = 0;

/** SwiftUI components call the closures they were given while they render: those reads count too. */
export function enterSwiftUIRender(): () => void {
  swiftUIRenders += 1;
  return () => {
    swiftUIRenders -= 1;
  };
}

/** A render starts over: what the component reads now is what it depends on. */
export function beginTracking(tracker: Tracker): void {
  tracker.reads.clear();
  tracker.open = true;
}

/** The render committed: later reads, such as in event handlers, are not dependencies. */
export function closeTracking(tracker: Tracker): void {
  tracker.open = false;
}

export function resumeTracking(tracker: Tracker): void {
  tracker.reads.forEach((_, observation) => listen(tracker, observation));
}

export function endTracking(tracker: Tracker): void {
  tracker.subscriptions.forEach((unsubscribe) => unsubscribe());
  tracker.subscriptions.clear();
}

function viewScope(tracker: Tracker, observation: Observation): Scope {
  let scope = tracker.scopes.get(observation);
  if (!scope) {
    const created: Scope = {
      observation,
      read: (key) => {
        recordRead(observation, key);
        if (tracker.open || swiftUIRenders > 0) trackRead(tracker, observation, key);
      },
      wrap: (value, key) => {
        if (isObserved(value)) return roots.get(value)!.observation.kind === 'observable' ? viewOf(tracker, value) : value;
        return kindOf(value) ? nestedProxy(created, value as object, key) : value;
      },
      bindings: new Map(),
      nested: new WeakMap(),
    };
    tracker.scopes.set(observation, (scope = created));
  }
  return scope;
}

/**
 * A component's view of an `Observable`: it reads and writes the object, and records the properties
 * read while the component renders, or while a SwiftUI component calls a closure it was given.
 */
export function viewOf<T extends object>(tracker: Tracker, object: T): T {
  const root = roots.get(object);
  if (!root || root.observation.kind !== 'observable') throw new TypeError('swiftui-react-native: expected an object of an Observable subclass.');
  const target = root.canonical;
  let view = tracker.views.get(target);
  if (!view) {
    view = new Proxy(root.instance, rootHandler(viewScope(tracker, root.observation)));
    roots.set(view, root);
    tracker.views.set(target, view);
  }
  return view as T;
}

/**
 * `withObservationTracking`: runs `apply`, and calls `onChange` once, before the first change to
 * any `Observable` property `apply` read.
 */
export function withObservationTracking<T>(apply: () => T, options: { onChange: () => void }): T {
  const reads = new Map<Observation, Set<Key>>();
  const result = withRecorder((observation, key) => {
    let keys = reads.get(observation);
    if (!keys) reads.set(observation, (keys = new Set()));
    keys.add(key);
  }, apply);
  let fired = false;
  const cancels: (() => void)[] = [];
  reads.forEach((keys, observation) => {
    const onChange = (key: Key) => {
      if (fired || !(keys.has(key) || keys.has(EVERY_KEY))) return;
      fired = true;
      cancels.forEach((cancel) => cancel());
      options.onChange();
    };
    observation.listeners.add(onChange);
    cancels.push(() => observation.listeners.delete(onChange));
  });
  return result;
}
