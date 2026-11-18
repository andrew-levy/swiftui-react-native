type Callback = (...args: unknown[]) => unknown;

export interface Scope {
  readonly id: number;
  readonly name: string;
  readonly args: readonly unknown[];
}

const EXPIRY_MS = 100;

let nextId = 1;
let pending: Scope | null = null;
let expiry: ReturnType<typeof setTimeout> | null = null;

const callbacks = new Map<number, Map<string, Callback>>();

function finish(scope: Scope): void {
  if (pending !== scope) return;
  pending = null;
  if (expiry !== null) clearTimeout(expiry);
  expiry = null;
}

function expire(scope: Scope): void {
  if (pending !== scope) return;
  finish(scope);
  const remaining = callbacks.get(scope.id);
  callbacks.delete(scope.id);
  remaining?.forEach((callback) => callback());
}

export const CALLBACK_PREFIX = '$scope:';

export const nextScopeId = (): number => nextId++;

export function openScope(scope: Scope, scopeCallbacks: Map<string, Callback>): void {
  if (scopeCallbacks.size > 0) callbacks.set(scope.id, scopeCallbacks);
  if (expiry !== null) clearTimeout(expiry);
  pending = scope;
  expiry = setTimeout(() => expire(scope), EXPIRY_MS);
}

export const currentScope = (): Scope | null => pending;

export const scopeCommitted = finish;

export function invokeScopeCallback(id: string, args: readonly unknown[]): boolean {
  if (!id.startsWith(CALLBACK_PREFIX)) return false;
  const scopeId = Number(id.slice(CALLBACK_PREFIX.length).split('.')[0]);
  const scope = callbacks.get(scopeId);
  const callback = scope?.get(id);
  if (scope && callback) {
    scope.delete(id);
    if (scope.size === 0) callbacks.delete(scopeId);
    callback(...args);
  }
  return true;
}
