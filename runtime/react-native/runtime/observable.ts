import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  beginTracking,
  closeTracking,
  createTracker,
  endTracking,
  observationOf,
  resumeTracking,
  viewOf,
  type Bindable,
  type Observable,
  type ObservableObject,
  type Observed,
  type Tracker,
} from './observation';

/** `@ObservedObject`: re-renders the component whenever the object changes. */
export function useObservedObject<T extends ObservableObject>(object: T): Observed<T> {
  const observation = observationOf(object, 'object');
  useSyncExternalStore(observation.subscribe, observation.getVersion);
  return object as Observed<T>;
}

/** `@StateObject`: creates the object once for the component's lifetime, and observes it. */
export function useStateObject<T extends ObservableObject>(create: () => T): Observed<T> {
  const [object] = useState(create);
  return useObservedObject(object);
}

/** Records what this render reads, and re-renders when one of those properties changes. */
export function useTracker(): Tracker {
  const ref = useRef<Tracker | null>(null);
  if (ref.current === null) ref.current = createTracker();
  const tracker = ref.current;
  beginTracking(tracker);
  useSyncExternalStore(tracker.subscribe, tracker.getVersion);
  // Children render before this commits, so reads through views this component passed down count.
  useLayoutEffect(() => closeTracking(tracker));
  useEffect(() => {
    resumeTracking(tracker);
    return () => endTracking(tracker);
  }, [tracker]);
  return tracker;
}

/**
 * Reads an `Observable` the way a SwiftUI body does: the component re-renders only when a property
 * it read changes. Pass the object from props, state or anywhere else.
 *
 * @example
 * const [library] = useState(() => new Library());
 * const { count } = useObservable(library);
 */
export function useObservable<T extends Observable>(object: T): Bindable<T> {
  return viewOf(useTracker(), object) as Bindable<T>;
}

/**
 * `@Bindable`: tracks reads like `useObservable`, and gives a `Binding` to each property under
 * `$name`: `<TextField text={book.$title} />`.
 */
export function useBindable<T extends Observable>(object: T): Bindable<T> {
  return useObservable(object);
}
