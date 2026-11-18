import type { ComposeChain, ViewModifierChain } from '../generated/modifiers/view';
import { recordedModifierClosures, type symbolEffectNames, viewModifierNames } from '../generated/modifiers/runtime';
import type { Observable, ObservableObject } from './observation';
import { SYMBOLIC_EFFECT, symbolicArgument, symbolicEffect } from './symbolic';

export interface ModifierCall {
  readonly name: string;
  readonly args: readonly unknown[];
}

export type SymbolEffect = (typeof symbolEffectNames)[number] | (string & {});

declare module '../generated/modifiers/view' {
  interface ViewModifiers {
    symbolEffect(
      effect: SymbolEffect,
      options?: {
        options?: { speed?: number; repeat?: number; repeating?: boolean };
        isActive?: boolean;
        value?: unknown;
      }
    ): ViewModifierChain;
    /**
     * Supplies an `ObservableObject` to this view's descendants, which read it with
     * `useEnvironmentObject(Type)`. It stays in JavaScript: nothing is sent to SwiftUI.
     *
     * @swift `func environmentObject<T>(_ object: T) -> some View where T : ObservableObject`
     */
    environmentObject(object: ObservableObject): ViewModifierChain;
    /**
     * Supplies an `Observable` to this view's descendants, which read it with
     * `useEnvironment(Type)`. It stays in JavaScript: nothing is sent to SwiftUI. `null` supplies nothing.
     *
     * @swift `func environment<T>(_ object: T?) -> some View where T : AnyObject, T : Observable`
     */
    environment(object: Observable | null | undefined): ViewModifierChain;
    /**
     * Publishes an `ObservableObject` while this view or one of its descendants has focus. Any
     * component reads it with `useFocusedObject(Type)`. `null` publishes nothing.
     *
     * @swift `func focusedObject<T>(_ object: T?) -> some View where T : ObservableObject`
     */
    focusedObject(object: ObservableObject | null | undefined): ViewModifierChain;
    /**
     * Publishes an `ObservableObject` while this view's scene has focus, wherever focus is in it.
     * Any component reads it with `useFocusedObject(Type)`. `null` publishes nothing.
     *
     * @swift `func focusedSceneObject<T>(_ object: T?) -> some View where T : ObservableObject`
     */
    focusedSceneObject(object: ObservableObject | null | undefined): ViewModifierChain;
    /**
     * Publishes an `Observable` while this view or one of its descendants has focus. Any component
     * reads it with `useFocusedValue(Type)`. `null` publishes nothing.
     *
     * @swift `func focusedValue<T>(_ object: T?) -> some View where T : AnyObject, T : Observable`
     */
    focusedValue(object: Observable | null | undefined): ViewModifierChain;
    /**
     * Publishes an `Observable` while this view's scene has focus, wherever focus is in it. Any
     * component reads it with `useFocusedValue(Type)`. `null` publishes nothing.
     *
     * @swift `func focusedSceneValue<T>(_ object: T?) -> some View where T : AnyObject, T : Observable`
     */
    focusedSceneValue(object: Observable | null | undefined): ViewModifierChain;
  }
}

/** Modifiers that take a JavaScript object: they are resolved in JavaScript, not sent as they are. */
export const OBJECT_MODIFIERS = {
  environmentObject: { role: 'environment', kind: 'object' },
  environment: { role: 'environment', kind: 'observable' },
  focusedObject: { role: 'focus', kind: 'object', scene: false },
  focusedSceneObject: { role: 'focus', kind: 'object', scene: true },
  focusedValue: { role: 'focus', kind: 'observable', scene: false },
  focusedSceneValue: { role: 'focus', kind: 'observable', scene: true },
} as const;

export type ObjectModifierName = keyof typeof OBJECT_MODIFIERS;

const CALLS = Symbol.for('swiftui-react-native.modifier-calls');

class ModifierChain {
  readonly [CALLS]: readonly ModifierCall[];

  constructor(calls: readonly ModifierCall[]) {
    this[CALLS] = calls;
  }
}

export function recordValue(closure: (...args: unknown[]) => unknown): unknown {
  return { $ret: closure(...Array.from({ length: Math.max(closure.length, 1) }, (_, index) => symbolicArgument(index))) };
}

function recordEffect(closure: (...args: unknown[]) => unknown): unknown {
  const steps: { m: string; a: readonly unknown[] }[] = [];
  const result = closure(symbolicEffect(steps), symbolicArgument(0)) as Record<symbol, unknown> | undefined;
  if (result?.[SYMBOLIC_EFFECT] !== steps) throw new TypeError('swiftui-react-native: this closure must return the effect it received, as in Swift.');
  return { $effects: steps };
}

const recorders = { value: recordValue, effect: recordEffect };

function recordArguments(name: string, args: readonly unknown[]): readonly unknown[] {
  const recorded = recordedModifierClosures[name];
  if (!recorded) return args;
  const lower = (value: unknown, key: string | number) => {
    const kind = recorded[key];
    return typeof value === 'function' && kind ? recorders[kind](value as (...args: unknown[]) => unknown) : value;
  };
  return args.map((arg, index) => {
    if (arg === null || typeof arg !== 'object' || Array.isArray(arg)) return lower(arg, index);
    return Object.fromEntries(Object.entries(arg).map(([key, value]) => [key, lower(value, key)]));
  });
}

const prototype = ModifierChain.prototype as unknown as Record<string, unknown>;
for (const name of new Set([...viewModifierNames, 'symbolEffect', ...Object.keys(OBJECT_MODIFIERS)])) {
  prototype[name] = function (this: ModifierChain, ...args: unknown[]) {
    return new ModifierChain([...this[CALLS], { name, args: recordArguments(name, args) }]);
  };
}

/** A chain of SwiftUI modifiers, created with `compose()`. */
export type Modifiers = ViewModifierChain;

/** Starts an empty modifier chain. */
export function compose(): ComposeChain {
  return new ModifierChain([]) as unknown as ComposeChain;
}

export function modifierCalls(chain: unknown): readonly ModifierCall[] {
  return chain instanceof ModifierChain ? chain[CALLS] : [];
}
