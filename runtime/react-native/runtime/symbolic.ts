export type Expression = number | readonly unknown[];

export type ScalarLike = number | Scalar;

const expression = (value: ScalarLike | string): Expression | string => (value instanceof Scalar ? value.$e : value);
const node = (name: string, ...operands: (ScalarLike | string)[]): Scalar => new Scalar([name, ...operands.map(expression)]);

/**
 * A number SwiftUI decides. `rect.width.times(0.5).plus(8)` is `rect.width * 0.5 + 8` in Swift.
 * Comparisons give a `Scalar` of 1 or 0, for `select`.
 */
export class Scalar {
  readonly $e: Expression;

  constructor(value: Expression) {
    this.$e = value;
  }

  plus(other: ScalarLike): Scalar {
    return node('add', this, other);
  }
  minus(other: ScalarLike): Scalar {
    return node('sub', this, other);
  }
  times(other: ScalarLike): Scalar {
    return node('mul', this, other);
  }
  dividedBy(other: ScalarLike): Scalar {
    return node('div', this, other);
  }
  remainder(other: ScalarLike): Scalar {
    return node('mod', this, other);
  }
  negated(): Scalar {
    return node('neg', this);
  }
  isLessThan(other: ScalarLike): Scalar {
    return node('lt', this, other);
  }
  isGreaterThan(other: ScalarLike): Scalar {
    return node('gt', this, other);
  }
  isEqualTo(other: ScalarLike | string): Scalar {
    return node('eq', this, other);
  }

  [Symbol.toPrimitive](): never {
    throw new TypeError(
      'swiftui-react-native: this number is only known to SwiftUI while it draws, so JavaScript operators cannot read it. Use its methods instead: rect.width.times(0.5).'
    );
  }
}

const lift =
  (name: string, plain: (...values: number[]) => number) =>
  <T extends ScalarLike[]>(...values: T): T[number] extends number ? number : Scalar =>
    (values.every((value) => typeof value === 'number') ? plain(...(values as number[])) : node(name, ...values)) as never;

export const Scalars = {
  abs: lift('abs', Math.abs),
  sqrt: lift('sqrt', Math.sqrt),
  floor: lift('floor', Math.floor),
  ceil: lift('ceil', Math.ceil),
  round: lift('round', Math.round),
  sin: lift('sin', Math.sin),
  cos: lift('cos', Math.cos),
  tan: lift('tan', Math.tan),
  asin: lift('asin', Math.asin),
  acos: lift('acos', Math.acos),
  atan: lift('atan', Math.atan),
  exp: lift('exp', Math.exp),
  log: lift('log', Math.log),
  atan2: lift('atan2', Math.atan2),
  pow: lift('pow', Math.pow),
  min: lift('min', Math.min),
  max: lift('max', Math.max),
  /** `condition ? yes : no`, for a condition SwiftUI decides. */
  select: (condition: ScalarLike, yes: ScalarLike, no: ScalarLike): Scalar => node('select', condition, yes, no),
};

export interface SymbolicPoint {
  readonly x: Scalar;
  readonly y: Scalar;
}

export interface SymbolicSize {
  readonly width: Scalar;
  readonly height: Scalar;
}

export interface SymbolicTransform {
  readonly a: Scalar;
  readonly b: Scalar;
  readonly c: Scalar;
  readonly d: Scalar;
  readonly tx: Scalar;
  readonly ty: Scalar;
}

export interface SymbolicRect extends SymbolicPoint, SymbolicSize {
  readonly origin: SymbolicPoint;
  readonly size: SymbolicSize;
  readonly minX: Scalar;
  readonly midX: Scalar;
  readonly maxX: Scalar;
  readonly minY: Scalar;
  readonly midY: Scalar;
  readonly maxY: Scalar;
  insetBy(options: { dx: ScalarLike; dy: ScalarLike }): SymbolicRect;
  offsetBy(options: { dx: ScalarLike; dy: ScalarLike }): SymbolicRect;
}

type Reader = (field: string) => Scalar;

export const symbolicSize = (read: Reader): SymbolicSize => ({ width: read('width'), height: read('height') });
export const symbolicPoint = (read: Reader): SymbolicPoint => ({ x: read('x'), y: read('y') });
export const symbolicTransform = (read: Reader): SymbolicTransform => ({ a: read('a'), b: read('b'), c: read('c'), d: read('d'), tx: read('tx'), ty: read('ty') });

export function symbolicFrame(x: ScalarLike, y: ScalarLike, width: ScalarLike, height: ScalarLike): SymbolicRect {
  const scalar = (value: ScalarLike) => (value instanceof Scalar ? value : new Scalar(value));
  const [sx, sy, sw, sh] = [scalar(x), scalar(y), scalar(width), scalar(height)];
  const midX = sx.plus(sw.dividedBy(2));
  const midY = sy.plus(sh.dividedBy(2));
  const derived = {
    origin: { x: sx, y: sy },
    size: { width: sw, height: sh },
    minX: sx,
    midX,
    maxX: sx.plus(sw),
    minY: sy,
    midY,
    maxY: sy.plus(sh),
    insetBy: ({ dx, dy }: { dx: ScalarLike; dy: ScalarLike }) => symbolicFrame(sx.plus(dx), sy.plus(dy), sw.minus(node('mul', dx, 2)), sh.minus(node('mul', dy, 2))),
    offsetBy: ({ dx, dy }: { dx: ScalarLike; dy: ScalarLike }) => symbolicFrame(sx.plus(dx), sy.plus(dy), sw, sh),
  };
  const rect = { x: sx, y: sy, width: sw, height: sh };
  for (const [key, value] of Object.entries(derived)) Object.defineProperty(rect, key, { value, enumerable: false });
  return rect as unknown as SymbolicRect;
}

export const symbolicRect = (read: Reader): SymbolicRect => symbolicFrame(read('x'), read('y'), read('width'), read('height'));

export type Symbolic<T> = T extends number
  ? ScalarLike
  : T extends string | boolean | null | undefined | ((...args: never[]) => unknown)
    ? T
    : T extends { readonly $calls: unknown }
      ? T
      : T extends readonly (infer Element)[]
        ? readonly Symbolic<Element>[]
        : T extends object
          ? { [Key in keyof T]: Symbolic<T[Key]> }
          : T;

export type SymbolicValue = Scalar & { readonly [field: string]: SymbolicValue } & ((...args: unknown[]) => SymbolicValue);

export function symbolicArgument(index: number, path: readonly string[] = []): SymbolicValue {
  const field = path.length > 0 ? path.join('.') : null;
  const scalar = new Scalar(field === null ? ['arg', index] : ['arg', index, field]);
  const method = (args: readonly unknown[]) => {
    const name = path.at(-1);
    if (name === undefined) throw new TypeError('swiftui-react-native: this value of SwiftUI is not a function.');
    const call = ['call', index, path.length > 1 ? path.slice(0, -1).join('.') : null, name, args];
    return reading(new Scalar(call), (key) => new Scalar([...call, key]));
  };
  return reading(scalar, (key) => symbolicArgument(index, [...path, key]), method) as SymbolicValue;
}

function reading(scalar: Scalar, field: (key: string) => unknown, method?: (args: readonly unknown[]) => unknown): unknown {
  const target = () => undefined;
  return new Proxy(target, {
    get: (_, key) => (typeof key === 'symbol' || key in scalar ? Reflect.get(scalar, key, scalar) : field(key)),
    has: (_, key) => key in scalar,
    getPrototypeOf: () => Scalar.prototype,
    apply: (_, __, args) => {
      if (!method) throw new TypeError('swiftui-react-native: this value of SwiftUI is not a function.');
      return method(args);
    },
  });
}

export const SYMBOLIC_EFFECT = Symbol.for('swiftui-react-native.symbolic-effect');
export type SymbolicEffect = { readonly [method: string]: (...args: any[]) => SymbolicEffect };

export function symbolicEffect(steps: { m: string; a: readonly unknown[] }[] = []): SymbolicEffect {
  const effect: SymbolicEffect = new Proxy({} as SymbolicEffect, {
    get: (_, key) => {
      if (key === SYMBOLIC_EFFECT) return steps;
      if (typeof key === 'symbol') return undefined;
      return (...args: unknown[]) => {
        steps.push({ m: key, a: args });
        return effect;
      };
    },
  });
  return effect;
}

export function isSymbolic(value: unknown): boolean {
  if (value instanceof Scalar) return true;
  if (Array.isArray(value)) return value.some(isSymbolic);
  if (value === null || typeof value !== 'object') return false;
  return Object.values(value).some(isSymbolic);
}
