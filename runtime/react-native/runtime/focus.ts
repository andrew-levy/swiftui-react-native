import { useCallback, useSyncExternalStore } from 'react';
import { useTracker } from './observable';
import {
  observationOf,
  viewOf,
  type Bindable,
  type Observable,
  type ObservableObject,
  type ObservableObjectType,
  type ObservableType,
  type ObservationKind,
  type Observed,
} from './observation';

export interface FocusEntry {
  readonly token: string;
  readonly object: ObservableObject | Observable;
  readonly scene: boolean;
}

const entries = new Map<string, FocusEntry>();
const byOwner = new Map<number, readonly FocusEntry[]>();
const listeners = new Set<() => void>();
const scenes = new Map<string, { depth: number; active: boolean }>();
let focused: readonly string[] = [];
let version = 0;

function changed(): void {
  version += 1;
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** The objects a component's focus modifiers publish, replacing what it published before. */
export function publishFocusEntries(owner: number, next: readonly FocusEntry[]): void {
  const previous = byOwner.get(owner) ?? [];
  if (previous.length === next.length && previous.every((entry, index) => entry.token === next[index]!.token && entry.object === next[index]!.object && entry.scene === next[index]!.scene)) {
    return;
  }
  const kept = new Set(next.map((entry) => entry.token));
  previous.forEach((entry) => {
    entries.delete(entry.token);
    if (!kept.has(entry.token)) scenes.delete(entry.token);
  });
  next.forEach((entry) => entries.set(entry.token, entry));
  if (next.length > 0) byOwner.set(owner, next);
  else byOwner.delete(owner);
  changed();
}

/** What SwiftUI reports: the tokens of the focused view and its ancestors, outermost first. */
export function updateFocus(tokens: readonly string[]): void {
  if (tokens.join('\n') === focused.join('\n')) return;
  focused = tokens;
  changed();
}

/** What a scene publisher reports: whether its window has focus, and how deep it is among scene publishers. */
export function updateScene(token: string, depth: number, active: boolean): void {
  const previous = scenes.get(token);
  if (previous?.depth === depth && previous.active === active) return;
  scenes.set(token, { depth, active });
  changed();
}

function matches(token: string, type: Function, kind: ObservationKind): ObservableObject | Observable | null {
  const entry = entries.get(token);
  return entry && entry.object instanceof type && observationOf(entry.object).kind === kind ? entry.object : null;
}

// The focused view and its ancestors come first, innermost first; then the focused scene's publishers, innermost first.
export function findFocused(type: Function, kind: ObservationKind): ObservableObject | Observable | null {
  for (let index = focused.length - 1; index >= 0; index--) {
    const object = matches(focused[index]!, type, kind);
    if (object) return object;
  }
  const active = [...scenes].filter(([, scene]) => scene.active).sort(([, a], [, b]) => b.depth - a.depth);
  for (const [token] of active) {
    const object = matches(token, type, kind);
    if (object) return object;
  }
  return null;
}

const noSubscription = () => () => {};

/**
 * `@FocusedObject`: the object of this type that the focused view, one of its ancestors, or the
 * focused scene publishes with `focusedObject` or `focusedSceneObject`, or `null`. The component
 * re-renders when focus moves and when the object changes.
 */
export function useFocusedObject<T extends ObservableObject>(type: ObservableObjectType<T>): Observed<T> | null {
  const object = useSyncExternalStore(subscribe, () => findFocused(type, 'object')) as T | null;
  const observation = object ? observationOf(object, 'object') : null;
  useSyncExternalStore(
    useCallback((listener: () => void) => (observation ? observation.subscribe(listener) : noSubscription()), [observation]),
    () => observation?.version ?? -1
  );
  return object as Observed<T> | null;
}

/**
 * `@FocusedValue(Model.self)`: the `Observable` of this type that the focused view, one of its
 * ancestors, or the focused scene publishes with `focusedValue` or `focusedSceneValue`, or `null`.
 * The component re-renders when focus moves and when a property it read changes.
 */
export function useFocusedValue<T extends Observable>(type: ObservableType<T>): Bindable<T> | null {
  const tracker = useTracker();
  const object = useSyncExternalStore(subscribe, () => findFocused(type, 'observable')) as T | null;
  return object ? (viewOf(tracker, object) as Bindable<T>) : null;
}
