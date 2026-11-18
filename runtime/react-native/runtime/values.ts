import { lazyHybridObject } from '../nitro/createHybridObject';
import type { SwiftUIRuntime } from '../nitro/specs/SwiftUIRuntime.nitro';
import { encodeArguments } from './bridge';
import { isSymbolic, Scalar, symbolicFrame, symbolicPoint, symbolicSize } from './symbolic';

interface ValueCall {
  readonly m: string;
  readonly a: readonly unknown[];
}

export interface ValueQueries {
  readonly type: string;
  readonly members: Readonly<Record<string, { readonly kind: 'property' | 'method' | 'each'; readonly returns: string }>>;
}

const runtime = lazyHybridObject<SwiftUIRuntime>('SwiftUIRuntime');

function ask(chain: object, queries: ValueQueries, name: string, args: readonly unknown[]): unknown {
  if (isSymbolic(chain) || isSymbolic(args)) {
    const read = (field?: string) => new Scalar(['query', queries.type, chain, name, args, ...(field === undefined ? [] : [field])]);
    switch (queries.members[name]?.returns) {
      case 'CGRect':
        return symbolicFrame(read('x'), read('y'), read('width'), read('height'));
      case 'CGSize':
        return symbolicSize(read);
      case 'CGPoint':
      case 'CGPoint?':
        return symbolicPoint(read);
      default:
        return read();
    }
  }
  const [value, ...encoded] = encodeArguments([chain, ...args], `${queries.type}.${name}`);
  return evaluateValue(queries.type, value, name, encoded);
}

const reviveNumbers = (_: string, value: unknown): unknown => {
  if (value === null || typeof value !== 'object') return value;
  if ('$nan' in value) return Number.NaN;
  if ('$inf' in value) return (value as { $inf: number }).$inf < 0 ? -Infinity : Infinity;
  return value;
};

export function evaluateValue(type: string, value: unknown, member: string, args: readonly unknown[]): unknown {
  const [result] = JSON.parse(runtime().evaluate(type, JSON.stringify(value ?? null), member, JSON.stringify(args)), reviveNumbers) as [unknown];
  return result;
}

const prototypes = new Map<string, object>();

function chainPrototype(calls: readonly string[], queries?: ValueQueries): object {
  const key = `${queries?.type ?? ''}:${calls.join()}`;
  const existing = prototypes.get(key);
  if (existing) return existing;
  const prototype: Record<string, unknown> = {};
  for (const name of calls) {
    Object.defineProperty(prototype, name, {
      enumerable: false,
      value(this: { $base: unknown; $calls: readonly ValueCall[] }, ...args: unknown[]) {
        return chainOf(this.$base, [...this.$calls, { m: name, a: args }], prototype);
      },
    });
  }
  for (const [name, { kind }] of Object.entries(queries?.members ?? {})) {
    if (kind === 'property') {
      Object.defineProperty(prototype, name, {
        enumerable: false,
        get(this: object) {
          return ask(this, queries!, name, []);
        },
      });
    } else if (kind === 'method') {
      Object.defineProperty(prototype, name, {
        enumerable: false,
        value(this: object, ...args: unknown[]) {
          return ask(this, queries!, name, args);
        },
      });
    } else {
      Object.defineProperty(prototype, name, {
        enumerable: false,
        value(this: object, body: (element: unknown) => void) {
          (ask(this, queries!, name, []) as unknown[]).forEach((element) => body(element));
        },
      });
    }
  }
  prototypes.set(key, prototype);
  return prototype;
}

function chainOf(base: unknown, recorded: readonly ValueCall[], prototype: object): unknown {
  const chain = Object.create(prototype) as Record<string, unknown>;
  chain.$base = base;
  chain.$calls = recorded;
  return chain;
}

export function valueChain<T>(base: unknown, calls: readonly string[], recorded: readonly ValueCall[] = [], queries?: ValueQueries): T {
  return chainOf(base, recorded, chainPrototype(calls, queries)) as T;
}
