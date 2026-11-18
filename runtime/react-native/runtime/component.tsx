import React, { useCallback, useEffect, useLayoutEffect, useReducer, useRef, type ComponentType, type ReactNode } from 'react';
import { Image as ReactNativeImage, type HostComponent, type NativeSyntheticEvent, type StyleProp, type ViewStyle } from 'react-native';
import { BridgeRegistry, globalProbe } from './bridge';
import { modifierCalls, OBJECT_MODIFIERS, recordValue, type ModifierCall, type Modifiers, type ObjectModifierName } from './compose';
import { EnvironmentObjectsContext, useEnvironmentObjects } from './environmentObjects';
import { publishFocusEntries, updateFocus, updateScene, type FocusEntry } from './focus';
import { canonical, enterSwiftUIRender, observationOf, type Observable, type ObservableObject } from './observation';
import { recordClosure, type ProgramClosure } from './programs';
import { currentScope, scopeCommitted } from './scope';

export interface SwiftUIViewProps {
  /** SwiftUI modifiers, applied in order: `compose().padding(12).background('blue')`. */
  modifiers?: Modifiers;
  /** React Native layout of the component's box (Yoga). */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

interface NativeComponentProps {
  nodeProps: string;
  modifiers: string;
  onEvent: (event: NativeSyntheticEvent<Readonly<{ payload: string }>>) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  children?: ReactNode;
}

export type NativeSwiftUIComponent = HostComponent<NativeComponentProps> | ComponentType<NativeComponentProps>;

export interface ComponentDescription {
  name: string;
  props: readonly string[];
  events?: readonly string[];
  children: 'nodes' | 'text' | 'auto' | 'none';
  renderChildren?: boolean;
  elements?: { data: string; id: string; tree?: string };
  program?: ProgramClosure;
  recorded?: readonly string[];
  assets?: readonly string[];
  part?: string;
  textProp?: string;
}

const runtimeComponents: {
  // `Text` is a union of initializers; the runtime only ever renders the string one.
  Text?: ComponentType<any>;
  Part?: NativeSwiftUIComponent;
} = {};

export function registerRuntimeComponents(components: typeof runtimeComponents): void {
  Object.assign(runtimeComponents, components);
}

export function textContent(children: ReactNode): string {
  if (children === null || children === undefined || typeof children === 'boolean') return '';
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(textContent).join('');
  return '';
}

function wrapText(children: ReactNode): ReactNode {
  const Text = runtimeComponents.Text;
  if (!Text) return children;
  const result: ReactNode[] = [];
  let pending: string | null = null;
  const flush = () => {
    if (pending !== null) result.push(<Text key={`$text:${result.length}`}>{pending}</Text>);
    pending = null;
  };
  for (const child of React.Children.toArray(children)) {
    if (typeof child === 'string' || typeof child === 'number') {
      pending = (pending ?? '') + String(child);
    } else {
      flush();
      result.push(child);
    }
  }
  flush();
  return result;
}

function isTextOnly(children: ReactNode): boolean {
  if (typeof children === 'string' || typeof children === 'number') return true;
  if (!Array.isArray(children) || children.length === 0) return false;
  return children.every(isTextOnly);
}

function elementKey(element: unknown, index: number, id: unknown): string {
  if (typeof id === 'function') return String(id(element));
  if (id === 'self') return String(element);
  const record = element as Record<string, unknown> | null | undefined;
  if (typeof id === 'string') return String(record?.[id]);
  return String(record?.id ?? index);
}

type RenderElement = (element: unknown, index: number) => ReactNode;

export function createSwiftUIComponent<P extends object>(
  Native: NativeSwiftUIComponent,
  description: ComponentDescription
): ComponentType<P & SwiftUIViewProps> {
  function SwiftUIComponent(allProps: P & SwiftUIViewProps & { children?: ReactNode }) {
    const leave = enterSwiftUIRender();
    try {
      return useSwiftUIComponent(allProps);
    } finally {
      leave();
    }
  }
  function useSwiftUIComponent(allProps: P & SwiftUIViewProps & { children?: ReactNode }) {
    const { modifiers, style, testID } = allProps;
    const children = allProps.children as unknown;
    const values = allProps as unknown as Record<string, unknown>;
    const [, rerender] = useReducer((count: number) => count + 1, 0);
    const registry = useRef<BridgeRegistry>(null as unknown as BridgeRegistry);
    if (registry.current === null) registry.current = new BridgeRegistry();
    const bridge = registry.current;
    bridge.reset();

    const latestProps = useRef(values);
    latestProps.current = values;

    const props: Record<string, unknown> = {};
    const scope = currentScope();
    if (scope) props.$scope = scope;
    useLayoutEffect(() => {
      if (scope) scopeCommitted(scope);
    });
    if (description.part) props.$part = description.part;
    if (globalProbe()) props.$probe = true;
    for (const key of description.props) {
      if (values[key] === undefined) continue;
      const recorded = description.recorded?.includes(key) && typeof values[key] === 'function';
      if (description.assets?.includes(key)) {
        const asset = ReactNativeImage.resolveAssetSource(values[key] as number);
        props[key] = asset ? { uri: asset.uri, scale: asset.scale ?? 1 } : null;
        continue;
      }
      props[key] = bridge.encode(recorded ? recordValue(values[key] as (...args: unknown[]) => unknown) : values[key], `p.${key}`);
    }

    let nodes = children as ReactNode;
    const program = description.program && typeof children === 'function' ? description.program : null;
    const isTree = description.elements?.tree !== undefined && values[description.elements.tree] !== undefined;
    const collection = description.elements && !isTree && Array.isArray(values[description.elements.data]) ? description.elements : null;
    if (program) {
      props.children = bridge.encode(recordClosure(program, children as (...args: never[]) => void), 'p.children');
      nodes = null;
    } else if (collection && typeof children === 'function') {
      const id = values[collection.id];
      const keys = (values[collection.data] as unknown[]).map((element, index) => {
        const key = elementKey(element, index, id);
        bridge.slots.push({ name: `el:${key}`, content: (children as RenderElement)(element, index) });
        return key;
      });
      props[collection.data] = { $elements: keys };
      if (id !== undefined) props[collection.id] = true;
      nodes = null;
    } else if (description.renderChildren && (typeof children === 'function' || description.children === 'none')) {
      if (children !== undefined) props.children = bridge.encode(children, 'p.children');
      nodes = null;
    } else if (description.textProp) {
      props[description.textProp] = textContent(nodes);
      nodes = null;
    } else if (description.children === 'text' || (description.children === 'auto' && isTextOnly(nodes))) {
      if (nodes !== undefined && nodes !== null) props.children = textContent(nodes);
      nodes = null;
    } else if (description.children === 'none') {
      nodes = null;
    }

    const owner = useRef(0);
    if (owner.current === 0) owner.current = nextOwner++;
    const resolved = resolveObjectModifiers(modifierCalls(modifiers), owner.current);
    const environment = useEnvironmentObjects(resolved.environment);
    useLayoutEffect(() => publishFocusEntries(owner.current, resolved.focus));
    useEffect(() => () => publishFocusEntries(owner.current, []), []);
    const calls = resolved.calls.map((call, index) => ({
      m: call.name,
      a: call.args.map((arg, position) => bridge.encode(arg, `m${index}.${position}`)),
    }));

    bridge.renderRequested();

    const onEvent = useCallback(
      (event: NativeSyntheticEvent<Readonly<{ payload: string }>>) => {
        const payload = event.nativeEvent.payload;
        if (payload.includes('"$focus"')) {
          updateFocus((JSON.parse(payload) as { $focus: string[] }).$focus);
          return;
        }
        if (payload.includes('"$sceneToken"')) {
          const message = JSON.parse(payload) as { $sceneToken: string; depth: number; active: boolean };
          updateScene(message.$sceneToken, message.depth, message.active);
          return;
        }
        registry.current.handle(payload, latestProps.current, description.name, rerender);
      },
      []
    );

    const Part = runtimeComponents.Part;
    const slots =
      Part && bridge.slots.length > 0
        ? bridge.slots.map((slot) => (
            <Part key={`$slot:${slot.name}`} nodeProps={JSON.stringify({ $slot: slot.name })} modifiers="[]" onEvent={noop}>
              {wrapText(slot.content)}
            </Part>
          ))
        : null;

    return (
      <Native nodeProps={JSON.stringify(props)} modifiers={JSON.stringify(calls)} onEvent={onEvent} style={style} testID={testID}>
        <EnvironmentObjectsContext.Provider value={environment}>
          {wrapText(nodes)}
          {slots}
        </EnvironmentObjectsContext.Provider>
      </Native>
    );
  }
  SwiftUIComponent.displayName = `SwiftUI.${description.part ?? description.name}`;
  return SwiftUIComponent as ComponentType<P & SwiftUIViewProps>;
}

function noop() {}

let nextOwner = 1;

interface ResolvedModifiers {
  readonly calls: readonly ModifierCall[];
  readonly environment: readonly (ObservableObject | Observable)[];
  readonly focus: readonly FocusEntry[];
}

// Objects stay in JavaScript: environment objects become React context, and a focused object is
// sent to SwiftUI as a token, so SwiftUI can say when its view has focus.
function resolveObjectModifiers(calls: readonly ModifierCall[], owner: number): ResolvedModifiers {
  const native: ModifierCall[] = [];
  const environment: (ObservableObject | Observable)[] = [];
  const focus: FocusEntry[] = [];
  for (const call of calls) {
    const spec = OBJECT_MODIFIERS[call.name as ObjectModifierName];
    const object = call.args[0];
    if (!spec || call.args.length !== 1) {
      native.push(call);
      continue;
    }
    if (object == null) continue;
    observationOf(object as object, spec.kind);
    if (spec.role === 'environment') {
      environment.push(canonical(object) as ObservableObject | Observable);
    } else {
      const token = `${owner}.${focus.length}`;
      focus.push({ token, object: canonical(object) as ObservableObject | Observable, scene: spec.scene });
      native.push({ name: '$focusToken', args: [{ token, scene: spec.scene }] });
    }
  }
  return { calls: native, environment, focus };
}

const FUNCTION_KEYS = new Set(['name', 'length', 'prototype', 'caller', 'arguments', 'displayName']);

export function withValues<C extends object, V extends object>(component: C, values: V): C & V {
  for (const [key, value] of Object.entries(values)) {
    if (!FUNCTION_KEYS.has(key)) Object.defineProperty(component, key, { value, enumerable: true });
  }
  return component as C & V;
}
