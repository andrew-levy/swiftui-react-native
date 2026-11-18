import { Scalar, symbolicPoint, symbolicRect, symbolicSize, symbolicTransform } from './symbolic';

interface ProgramResult {
  readonly kind: 'number' | 'reference';
  readonly swiftType: string;
}

export interface ProgramClosure {
  readonly type: string;
  readonly inputs: readonly string[];
}

interface ProgramTable {
  readonly chain?: () => unknown;
  readonly mutating?: readonly string[];
  readonly methods: Readonly<Record<string, readonly ProgramResult[]>>;
  readonly closures: Readonly<Record<string, ProgramClosure>>;
  readonly properties: Readonly<Record<string, { readonly result: ProgramResult; readonly settable: boolean }>>;
}

interface RecordedCall {
  m: string;
  a: readonly unknown[];
  r?: number;
  on?: number;
}

interface Recording {
  nextSlot: number;
}

const tables: Record<string, ProgramTable> = {};

export function registerPrograms(generated: Record<string, ProgramTable>): void {
  Object.assign(tables, generated);
}

function symbolicValue(swiftType: string, read: (field?: string) => Scalar): unknown {
  switch (swiftType) {
    case 'CGSize':
      return symbolicSize(read);
    case 'CGPoint':
      return symbolicPoint(read);
    case 'CGRect':
      return symbolicRect(read);
    case 'CGAffineTransform':
      return symbolicTransform(read);
    default:
      return read();
  }
}

class Recorder {
  constructor(
    readonly calls: RecordedCall[],
    readonly recording: Recording
  ) {}

  private slot(): number {
    return this.recording.nextSlot++;
  }

  private lower(value: unknown, closure: ProgramClosure | undefined): unknown {
    if (typeof value === 'function' && closure) return recordClosure(closure, value as (...args: never[]) => void, this.recording);
    if (value === null || typeof value !== 'object' || Array.isArray(value) || !closure) return value;
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, this.lower(item, closure)]));
  }

  private result(results: readonly ProgramResult[], slot: number): unknown {
    const numbers = results.find((result) => result.kind === 'number');
    if (numbers) return symbolicValue(numbers.swiftType, (field) => new Scalar(field === undefined ? ['slot', slot] : ['slot', slot, field]));
    return this.value(results.map((result) => result.swiftType), slot);
  }

  value(types: readonly string[], slot: number | null): object {
    const object: Record<string, unknown> = slot === null ? {} : { $ref: slot };
    for (const type of types) {
      const table = tables[type];
      if (table) this.define(object, table, slot);
    }
    Object.defineProperty(object, 'copy', {
      enumerable: false,
      value: () => {
        const copy = this.slot();
        this.calls.push({ m: '$copy', a: [], r: copy, ...(slot === null ? {} : { on: slot }) });
        return this.value(types, copy);
      },
    });
    return object;
  }

  private define(object: Record<string, unknown>, table: ProgramTable, slot: number | null): void {
    const target = slot === null ? {} : { on: slot };
    for (const [name, results] of Object.entries(table.methods)) {
      if (name in object) continue;
      Object.defineProperty(object, name, {
        enumerable: false,
        value: (...args: unknown[]) => {
          const a = args.map((arg) => this.lower(arg, table.closures[name]));
          if (results.length === 0) {
            this.calls.push({ m: name, a, ...target });
            return undefined;
          }
          const r = this.slot();
          this.calls.push({ m: name, a, r, ...target });
          return this.result(results, r);
        },
      });
    }
    for (const [name, property] of Object.entries(table.properties)) {
      if (name in object) continue;
      Object.defineProperty(object, name, {
        enumerable: false,
        get: () => {
          const r = this.slot();
          this.calls.push({ m: `$get:${name}`, a: [], r, ...target });
          return this.result([property.result], r);
        },
        set: property.settable
          ? (value: unknown) => {
              this.calls.push({ m: `$set:${name}`, a: [value], ...target });
            }
          : undefined,
      });
    }
  }
}

function chainRecorder(table: ProgramTable): { value: object; calls: () => unknown } {
  let current = table.chain!() as Record<string, unknown> & { $calls: unknown };
  const mutating = new Set(table.mutating);
  const value: object = new Proxy(
    {},
    {
      get(_, name) {
        const member = current[name as string];
        if (typeof member !== 'function') return member;
        if (!mutating.has(name as string)) return member.bind(current);
        return (...args: unknown[]) => {
          current = member.apply(current, args);
          return value;
        };
      },
    }
  );
  return { value, calls: () => current.$calls };
}

export function recordClosure(closure: ProgramClosure, body: (...args: never[]) => void, recording: Recording = { nextSlot: 0 }): { $ops: unknown } {
  const table = tables[closure.type];
  if (!table) throw new Error(`swiftui-react-native: ${closure.type} cannot be recorded`);
  const inputs = closure.inputs.map((type, index) => symbolicValue(type, (field) => new Scalar(field === undefined ? ['arg', index] : ['arg', index, field])));
  if (table.chain) {
    const chain = chainRecorder(table);
    (body as (...args: unknown[]) => void)(chain.value, ...inputs);
    return { $ops: chain.calls() };
  }
  const calls: RecordedCall[] = [];
  const recorder = new Recorder(calls, recording);
  (body as (...args: unknown[]) => void)(recorder.value([closure.type], null), ...inputs);
  return { $ops: calls };
}

export function recorded<T>(type: string, body: (value: T) => void): { readonly $ops: unknown } {
  return recordClosure({ type, inputs: [] }, body as (...args: never[]) => void);
}
