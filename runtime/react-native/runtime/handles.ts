import { lazyHybridObject } from '../nitro/createHybridObject';
import type { SwiftUIRuntime } from '../nitro/specs/SwiftUIRuntime.nitro';

export type EncodeArguments = (args: readonly unknown[], path: string) => unknown[];

const runtime = lazyHybridObject<SwiftUIRuntime>('SwiftUIRuntime');

async function call(handle: string, method: string, args: readonly unknown[], encode: EncodeArguments): Promise<unknown> {
  const encoded = encode(args, `${handle}.${method}`);
  const [result] = JSON.parse(await runtime().call(handle, method, JSON.stringify(encoded))) as [unknown];
  return revive(result, encode);
}

function reviveHandle(object: Record<string, unknown>, encode: EncodeArguments): unknown {
  const { $handle: handle, $methods: methods, ...properties } = object as { $handle: string; $methods: string[] };
  const callable = methods.includes('callAsFunction');
  const value: Record<string, unknown> = callable ? (((...args: unknown[]) => call(handle, 'callAsFunction', args, encode)) as unknown as Record<string, unknown>) : {};
  for (const [key, property] of Object.entries(properties)) value[key] = revive(property, encode);
  for (const method of methods) {
    if (method !== 'callAsFunction') value[method] = (...args: unknown[]) => call(handle, method, args, encode);
  }
  return value;
}

export function revive(value: unknown, encode: EncodeArguments): unknown {
  if (Array.isArray(value)) return value.map((item) => revive(item, encode));
  if (value === null || typeof value !== 'object') return value;
  const object = value as Record<string, unknown>;
  if ('$handle' in object) return reviveHandle(object, encode);
  return Object.fromEntries(Object.entries(object).map(([key, item]) => [key, revive(item, encode)]));
}
