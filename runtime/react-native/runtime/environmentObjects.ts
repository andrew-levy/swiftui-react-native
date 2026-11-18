import { createContext, useContext, useRef } from 'react';
import { useObservedObject, useTracker } from './observable';
import {
  Observable,
  ObservableObject,
  observationOf,
  viewOf,
  type Bindable,
  type ObservableObjectType,
  type ObservableType,
  type ObservationKind,
  type Observed,
} from './observation';

type Supplied = ObservableObject | Observable;
type EnvironmentObjects = ReadonlyMap<Function, Supplied>;

export const noEnvironmentObjects: EnvironmentObjects = new Map();

export const EnvironmentObjectsContext = createContext<EnvironmentObjects>(noEnvironmentObjects);

const BASES = new Set<unknown>([ObservableObject.prototype, Observable.prototype, Object.prototype, null]);

export function withObjects(parent: EnvironmentObjects, objects: readonly Supplied[]): EnvironmentObjects {
  // The first modifier is the closest to the view, as in SwiftUI, and an exact type beats a subclass.
  const level = new Map<Function, Supplied>();
  for (const object of objects) {
    observationOf(object);
    const type = Object.getPrototypeOf(object).constructor;
    if (!level.has(type)) level.set(type, object);
  }
  for (const object of objects) {
    for (let prototype = Object.getPrototypeOf(Object.getPrototypeOf(object)); !BASES.has(prototype); prototype = Object.getPrototypeOf(prototype)) {
      if (!level.has(prototype.constructor)) level.set(prototype.constructor, object);
    }
  }
  const merged = new Map(parent);
  level.forEach((object, type) => merged.set(type, object));
  return merged;
}

/** What a component's descendants see: the parent's objects plus those its modifiers supply. */
export function useEnvironmentObjects(objects: readonly Supplied[]): EnvironmentObjects {
  const parent = useContext(EnvironmentObjectsContext);
  const cache = useRef<{ parent: EnvironmentObjects; objects: readonly Supplied[]; value: EnvironmentObjects } | null>(null);
  if (objects.length === 0) return parent;
  const previous = cache.current;
  if (previous && previous.parent === parent && previous.objects.length === objects.length && previous.objects.every((object, index) => object === objects[index])) {
    return previous.value;
  }
  const value = withObjects(parent, objects);
  cache.current = { parent, objects, value };
  return value;
}

function find(objects: EnvironmentObjects, type: Function, kind: ObservationKind): Supplied | undefined {
  const object = objects.get(type);
  return object && observationOf(object).kind === kind ? object : undefined;
}

export function lookupEnvironmentObject<T extends ObservableObject>(objects: EnvironmentObjects, type: ObservableObjectType<T>): T {
  const object = find(objects, type, 'object') as T | undefined;
  if (!object) {
    throw new Error(`No ObservableObject of type ${type.name} found. A View.environmentObject(_:) for ${type.name} may be missing as an ancestor of this view.`);
  }
  return object;
}

export function lookupEnvironment<T extends Observable>(objects: EnvironmentObjects, type: ObservableType<T>, optional: boolean): T | null {
  const object = find(objects, type, 'observable') as T | undefined;
  if (!object && !optional) {
    throw new Error(`No Observable object of type ${type.name} found. A View.environment(_:) for ${type.name} may be missing as an ancestor of this view.`);
  }
  return object ?? null;
}

/**
 * `@EnvironmentObject`: reads the object an ancestor supplied with `.environmentObject(object)`,
 * and re-renders the component whenever it changes.
 *
 * @example
 * const session = useEnvironmentObject(Session);
 * return <TextField text={session.$name}>Name</TextField>;
 */
export function useEnvironmentObject<T extends ObservableObject>(type: ObservableObjectType<T>): Observed<T> {
  return useObservedObject(lookupEnvironmentObject(useContext(EnvironmentObjectsContext), type));
}

/**
 * `@Environment(Model.self)`: reads the `Observable` an ancestor supplied with `.environment(model)`.
 * The component re-renders only when a property it read changes. With `{ optional: true }`, like
 * `Model?.self`, a missing object gives `null` instead of throwing.
 *
 * @example
 * const library = useEnvironment(Library);
 * return <Text>{library.count}</Text>;
 */
export function useEnvironment<T extends Observable>(type: ObservableType<T>): Bindable<T>;
export function useEnvironment<T extends Observable>(type: ObservableType<T>, options: { optional: true }): Bindable<T> | null;
export function useEnvironment<T extends Observable>(type: ObservableType<T>, options?: { optional?: boolean }): Bindable<T> | null {
  const tracker = useTracker();
  const object = lookupEnvironment(useContext(EnvironmentObjectsContext), type, options?.optional === true);
  return object ? (viewOf(tracker, object) as Bindable<T>) : null;
}
