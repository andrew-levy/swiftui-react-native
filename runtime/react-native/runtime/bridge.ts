import { isValidElement, type ReactNode } from 'react';
import { revive } from './handles';
import { CALLBACK_PREFIX, invokeScopeCallback, nextScopeId, openScope } from './scope';

const MODIFIER_CALLS = Symbol.for('swiftui-react-native.modifier-calls');

type Callback = (...args: unknown[]) => unknown;
type BindingLike = { value: unknown; setValue: (value: unknown) => void };

export interface Slot {
  readonly name: string;
  readonly content: ReactNode;
}

function isBinding(value: object): value is BindingLike {
  return 'value' in value && typeof (value as { setValue?: unknown }).setValue === 'function';
}

function isReactContent(value: unknown): boolean {
  if (isValidElement(value)) return true;
  return Array.isArray(value) && value.length > 0 && value.every((item) => isValidElement(item) || item == null || item === false);
}

/** Must match `maxRendersPerClosure` in runtime/apple/Runtime/SUIContext.swift. */
const MAX_RENDERS_PER_CLOSURE = 256;

export type RenderProbe = (component: string, overload: string) => void;
export const globalProbe = (): RenderProbe | undefined => (globalThis as { __SUI_PROBE__?: RenderProbe }).__SUI_PROBE__;

interface RenderRequest {
  readonly fn: string;
  readonly args: unknown[];
}

export class BridgeRegistry {
  callbacks = new Map<string, Callback>();
  bindings = new Map<string, BindingLike>();
  slots: Slot[] = [];
  renders = new Map<string, RenderRequest>();

  reset(): void {
    this.callbacks = new Map();
    this.bindings = new Map();
    this.slots = [];
  }

  encode(value: unknown, path: string): unknown {
    if (value === undefined) return { $u: true };
    if (value === null || typeof value === 'boolean' || typeof value === 'string') return value;
    if (typeof value === 'number') {
      if (Number.isNaN(value)) return { $nan: true };
      if (!Number.isFinite(value)) return { $inf: value > 0 ? 1 : -1 };
      return value;
    }
    if (typeof value === 'function') {
      if ('$e' in value) return { $e: this.encode((value as { $e: unknown }).$e, `${path}.$e`) };
      if ('$shape' in value) return this.encode({ $shape: (value as { $shape: unknown }).$shape }, path);
      this.callbacks.set(path, value as Callback);
      return { $fn: path };
    }
    if (value instanceof Date) return value.toISOString();
    if (isReactContent(value)) {
      this.slots.push({ name: path, content: value as ReactNode });
      return { $slot: path };
    }
    if (Array.isArray(value)) return value.map((item, index) => this.encode(item, `${path}.${index}`));
    if (typeof value === 'object') {
      const chain = (value as Record<symbol, unknown>)[MODIFIER_CALLS] as readonly { name: string; args: readonly unknown[] }[] | undefined;
      if (chain) return { $chain: chain.map(({ name, args }, index) => ({ m: name, a: args.map((arg, position) => this.encode(arg, `${path}.${index}.${position}`)) })) };
      if (isBinding(value)) {
        this.bindings.set(path, value);
        return { $binding: path, value: this.encode(value.value, `${path}.value`) };
      }
      const result: Record<string, unknown> = {};
      for (const [key, item] of Object.entries(value)) {
        if (item !== undefined) result[key] = this.encode(item, `${path}.${key}`);
      }
      return result;
    }
    return String(value);
  }

  renderRequested(): void {
    for (const [name, request] of this.renders) {
      const render = this.callbacks.get(request.fn);
      if (render) this.slots.push({ name, content: render(...request.args) as ReactNode });
    }
  }

  private addRender(name: string, request: RenderRequest): void {
    this.renders.set(name, request);
    const sameClosure = [...this.renders].filter(([, other]) => other.fn === request.fn);
    if (sameClosure.length > MAX_RENDERS_PER_CLOSURE) this.renders.delete(sameClosure[0]![0]);
  }

  handle(payload: string, props: Record<string, unknown>, component: string, rerender: () => void): void {
    let message: {
      $fn?: string;
      $binding?: string;
      $event?: string;
      $error?: string;
      $render?: string;
      $rendered?: string;
      key?: string;
      args?: unknown[];
      value?: unknown;
    };
    try {
      message = JSON.parse(payload);
    } catch {
      return;
    }
    const args = revive(message.args ?? [], encodeArguments) as unknown[];
    if (message.$render !== undefined && message.key !== undefined) {
      this.addRender(message.key, { fn: message.$render, args });
      rerender();
    } else if (message.$rendered !== undefined) {
      globalProbe()?.(component, message.$rendered);
    } else if (message.$fn !== undefined) {
      if (!invokeScopeCallback(message.$fn, args)) this.callbacks.get(message.$fn)?.(...args);
    } else if (message.$binding !== undefined) {
      this.bindings.get(message.$binding)?.setValue(message.value);
    } else if (message.$event !== undefined) {
      const handler = props[message.$event];
      if (typeof handler === 'function') handler(...args);
    } else if (message.$error !== undefined && __DEV__) {
      console.warn(`[swiftui-react-native] <${component}> ${message.$error}`);
    }
  }
}

export function encodeArguments(args: readonly unknown[], path: string): unknown[] {
  const registry = new BridgeRegistry();
  return args.map((arg, index) => registry.encode(arg, `${path}.${index}`));
}

export function scoped(name: string, args: readonly unknown[], positional = 0): unknown {
  const index = args.findIndex((arg) => typeof arg === 'function');
  if (index === -1) throw new TypeError(`${name}: expected a function`);
  const before = args.slice(0, index);
  const options = args.slice(index + 1);
  const padding = options.length > 0 ? Array.from({ length: Math.max(0, positional - before.length) }) : [];
  const id = nextScopeId();
  const registry = new BridgeRegistry();
  const encoded = [...before, ...padding, ...options].map((arg, position) => registry.encode(arg, `${CALLBACK_PREFIX}${id}.${position}`));
  openScope({ id, name, args: encoded }, registry.callbacks);
  return (args[index] as () => unknown)();
}
