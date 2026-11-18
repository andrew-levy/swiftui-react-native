import React, { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ScrollView, StyleSheet, Text as RNText, View } from 'react-native';
import * as SwiftUIReactNative from 'swiftui-react-native';

const SERVER = 'http://127.0.0.1:8787';
const SETTLE_MS = 350;
const SCOPE_SETTLE_MS = 1200;

type Case = {
  id: string;
  kind: 'component' | 'modifier' | 'scope' | 'program';
  component: string;
  overload: string;
  props?: Record<string, unknown>;
  args?: unknown[];
  options?: Record<string, unknown> | null;
  subject?: { component: string; props: Record<string, unknown>; before?: { name: string; args: unknown[] } } | null;
  parent?: { component?: string; props?: Record<string, unknown>; modifier?: string; option?: string } | null;
  familyChild?: { component: string; props: Record<string, unknown> } | null;
  program?: ProgramCase;
  done?: boolean;
};

type RecordedCall = { m: string; a: unknown[] };
type ProgramCase = {
  via?: RecordedCall | null;
  call?: RecordedCall | { set: string; value: unknown } | { get: string };
  producers?: Record<string, RecordedCall>;
  tagged?: string;
  prelude?: RecordedCall | null;
  creator?: string;
  read?: string;
  ask?: RecordedCall;
};

const api = SwiftUIReactNative as unknown as Record<string, any>;

function expand(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(expand);
  if (value === null || typeof value !== 'object') return value;
  const object = value as Record<string, unknown>;
  if ('$binding' in object) return { value: expand(object.$binding), setValue() {} };
  if ('$fn' in object) return () => {};
  if ('$recorded' in object) return () => 1;
  if ('$effect' in object) return (effect: { opacity(value: number): unknown }) => effect.opacity(1);
  if ('$recordedChain' in object) return () => api.compose().opacity(1);
  if ('$chain' in object) return api.compose().opacity(1);
  if ('$node' in object) return <api.Text>{String(object.$node)}</api.Text>;
  if ('$render' in object) return () => <api.Text>Rendered</api.Text>;
  if ('$element' in object) return (element: unknown) => <api.Text>{String(element)}</api.Text>;
  if ('$member' in object) {
    const { component, props } = object.$member as { component: string; props: Record<string, unknown> };
    const Member = api[component];
    return <Member {...(expand(props) as object)} />;
  }
  return Object.fromEntries(Object.entries(object).map(([key, item]) => [key, expand(item)]));
}

function expandFor(value: unknown, target: any, producers: Record<string, RecordedCall>): unknown {
  if (Array.isArray(value)) return value.map((item) => expandFor(item, target, producers));
  if (value === null || typeof value !== 'object') return value;
  const object = value as Record<string, unknown>;
  if ('$closure' in object) return () => {};
  if ('$result' in object) {
    const producer = producers[object.$result as string]!;
    return target[producer.m](...(expandFor(producer.a, target, producers) as unknown[]));
  }
  return expand(Object.fromEntries(Object.entries(object).map(([key, item]) => [key, expandFor(item, target, producers)])));
}

function ProgramSubject({ entry }: { entry: Case }) {
  const program = entry.program!;
  const producers = program.producers ?? {};
  if (program.creator) {
    let value = api[program.creator]();
    if (program.prelude) value = value[program.prelude.m](...(expandFor(program.prelude.a, value, producers) as unknown[]));
    if (program.call && 'm' in program.call) value = value[program.call.m](...(expandFor(program.call.a, value, producers) as unknown[]));
    const answer = program.ask ? value[program.ask.m](...(expandFor(program.ask.a, value, producers) as unknown[])) : value[program.read as string];
    return <api.Text>{String(answer)}</api.Text>;
  }
  const Host = api[entry.component];
  return (
    <Host modifiers={api.compose().frame({ width: 60, height: 60 })} symbols={<api.Text modifiers={api.compose().tag(program.tagged)}>Sample</api.Text>}>
      {(root: any) => {
        const target = program.via ? root[program.via.m](...(expandFor(program.via.a, root, producers) as unknown[])) : root;
        const call = program.call!;
        if ('m' in call) target[call.m](...(expandFor(call.a, root, producers) as unknown[]));
        else if ('set' in call) target[call.set] = expandFor(call.value, root, producers);
        else void target[call.get];
      }}
    </Host>
  );
}

function ScopeSubject({ entry, onCallback }: { entry: Case; onCallback: () => void }) {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      const options = entry.options ? (expand(entry.options) as Record<string, unknown>) : undefined;
      for (const [key, value] of Object.entries(options ?? {})) {
        if (typeof value === 'function') (options as Record<string, unknown>)[key] = onCallback;
      }
      const args = [...(entry.args ?? []).map(expand), () => setFlag((value) => !value), ...(options ? [options] : [])];
      api[entry.component](...args);
    }, 50);
    return () => clearTimeout(timer);
  }, [entry, onCallback]);
  return <api.Text modifiers={api.compose().opacity(flag ? 0.5 : 1)}>Sample</api.Text>;
}

class Boundary extends Component<{ onError: (error: Error) => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error) {
    this.props.onError(error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function Subject({ entry, onCallback }: { entry: Case; onCallback: () => void }) {
  if (entry.kind === 'scope') return <ScopeSubject entry={entry} onCallback={onCallback} />;
  if (entry.kind === 'program') return <ProgramSubject entry={entry} />;
  if (entry.kind === 'modifier') {
    const before = entry.subject?.before;
    const start = before ? api.compose()[before.name](...before.args.map(expand)) : api.compose();
    const chain = start[entry.component](...(entry.args ?? []).map(expand));
    if (entry.subject) {
      const View = api[entry.subject.component];
      return <View {...(expand(entry.subject.props) as object)} modifiers={chain} />;
    }
    return <api.Text modifiers={chain}>Sample</api.Text>;
  }
  const Target = api[entry.component];
  if (!Target) throw new Error(`${entry.component} is not exported`);
  const props = expand(entry.props ?? {}) as object;
  let element = <Target {...props} />;
  if (entry.familyChild) {
    const Child = api[entry.familyChild.component];
    element = (
      <Target {...props}>
        <Child {...(expand(entry.familyChild.props) as object)} />
      </Target>
    );
  }
  const parent = entry.parent;
  if (parent?.component) {
    const Parent = api[parent.component];
    return <Parent {...(expand(parent.props ?? {}) as object)}>{element}</Parent>;
  }
  if (parent?.modifier) {
    return (
      <api.NavigationStack>
        <api.Text modifiers={api.compose()[parent.modifier]({ [parent.option as string]: element })}>Sample</api.Text>
      </api.NavigationStack>
    );
  }
  return element;
}

export default function CoverageScreen() {
  const [entry, setEntry] = useState<Case | null>(null);
  const [finished, setFinished] = useState(false);
  const [count, setCount] = useState(0);
  const rendered = useRef<string[]>([]);
  const errors = useRef<string[]>([]);
  const callbacks = useRef(0);
  const onCallback = useMemo(() => () => void (callbacks.current += 1), []);

  useEffect(() => {
    (globalThis as any).__SUI_PROBE__ = (_component: string, overload: string) => rendered.current.push(overload);
    const warn = console.warn;
    console.warn = (...args: unknown[]) => {
      const text = args.map(String).join(' ');
      if (text.includes('[swiftui-react-native]')) errors.current.push(text);
      else warn(...args);
    };
    return () => {
      console.warn = warn;
      delete (globalThis as any).__SUI_PROBE__;
    };
  }, []);

  const next = useMemo(
    () => async () => {
      rendered.current = [];
      errors.current = [];
      callbacks.current = 0;
      const response = await fetch(`${SERVER}/next`);
      const nextCase = (await response.json()) as Case;
      if (nextCase.done) setFinished(true);
      else setEntry(nextCase);
    },
    []
  );

  useEffect(() => {
    next().catch(() => setFinished(true));
  }, [next]);

  useEffect(() => {
    if (!entry) return;
    const timer = setTimeout(async () => {
      const failures = errors.current;
      let status: string;
      const expectsCallback = entry.kind === 'scope' && Object.values(entry.options ?? {}).some((value) => typeof value === 'object' && value !== null && '$fn' in value);
      if (expectsCallback && callbacks.current === 0) failures.push(`[swiftui-react-native] ${entry.component}: the callback never ran`);
      if (failures.length > 0) status = 'rejected';
      else if (entry.kind !== 'component') status = 'rendered';
      else if (rendered.current.length === 0) status = 'rejected';
      else status = rendered.current.includes(entry.overload) ? 'rendered' : 'otherOverload';
      await fetch(`${SERVER}/result`, {
        method: 'POST',
        body: JSON.stringify({ id: entry.id, status, rendered: rendered.current, errors: failures.slice(0, 3) }),
      });
      setCount((value) => value + 1);
      await next();
    }, entry.kind === 'scope' ? SCOPE_SETTLE_MS : SETTLE_MS);
    return () => clearTimeout(timer);
  }, [entry, next]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <RNText style={styles.title}>{finished ? `Finished ${count} cases` : `Case ${count + 1}`}</RNText>
      {entry && !finished ? (
        <>
          <RNText style={styles.caption}>
            {entry.component} {entry.overload}
          </RNText>
          <View key={entry.id} style={styles.stage}>
            <Boundary onError={(error) => errors.current.push(`[swiftui-react-native] ${String(error)}`)}>
              <Subject entry={entry} onCallback={onCallback} />
            </Boundary>
          </View>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  title: { fontSize: 15, fontWeight: '600' },
  caption: { fontSize: 13, color: '#6d6d72', marginVertical: 8 },
  stage: { minHeight: 300 },
});
