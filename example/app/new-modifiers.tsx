import React, { useState, type ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Button,
  Form,
  HStack,
  Image,
  RoundedRectangle,
  Scalars,
  ScrollView,
  Section,
  Spacer,
  Text,
  VStack,
  compose,
  useBinding,
} from 'swiftui-react-native';

const fruits = [
  { id: 'apple', name: 'Apple' },
  { id: 'kiwi', name: 'Kiwi' },
  { id: 'plum', name: 'Plum' },
];
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'] as const;

const NAVIGATION_BAR_HEIGHT = 44;

const title = compose().font('subheadline').fontDesign('monospaced').fontWeight('semibold');
const note = compose().font('footnote').foregroundStyle('secondary');

function Row({ name, children, hint }: { name: string; children?: ReactNode; hint: string }) {
  return (
    <VStack alignment="leading" spacing={8}>
      <Text modifiers={title}>{name}</Text>
      {children}
      <Text modifiers={note}>{hint}</Text>
    </VStack>
  );
}

const tile = (color: string, width: number, height: number) => compose().foregroundStyle(color).frame({ width, height });

function Layout() {
  return (
    <Section title="Layout">
      <Row name="alignmentGuide" hint="The guide is computed from the view's own width, natively: the orange bar starts where the blue one is half way.">
        <VStack alignment="leading" spacing={4}>
          <RoundedRectangle cornerRadius={4} modifiers={tile('blue', 120, 14)} />
          <RoundedRectangle cornerRadius={4} modifiers={tile('orange', 120, 14).alignmentGuide('leading', { computeValue: (dimensions) => dimensions.width.times(-0.5) })} />
        </VStack>
      </Row>
      <Row name="lineHeight" hint="Loose line height on wrapped text.">
        <Text modifiers={compose().lineHeight('loose')}>SwiftUI spaces these lines out, with no line spacing set by hand on this text at all.</Text>
      </Row>
      <Row name="modifier" hint="A compose() chain used as a ViewModifier.">
        <Text modifiers={compose().modifier(compose().bold().foregroundStyle('pink'))}>Styled by a reusable chain</Text>
      </Row>
    </Section>
  );
}

function Effects() {
  const [taps, setTaps] = useState(0);
  return (
    <Section title="Effects">
      <Row name="visualEffect" hint="Reads proxy.frame(in: .global) on the native side: scroll the page and the colors shift with no JavaScript running.">
        <HStack spacing={6}>
          {colors.map((color) => (
            <RoundedRectangle key={color} cornerRadius={6} modifiers={tile(color, 36, 36).visualEffect((effect, proxy) => effect.hueRotation({ degrees: proxy.frame({ in: 'global' }).minY }))} />
          ))}
        </HStack>
      </Row>
      <Row name="scrollTransition" hint="Scroll sideways: cards fade and shrink as they leave. The phase is read natively.">
        <ScrollView axes="horizontal" modifiers={compose().frame({ height: 70 })}>
          <HStack spacing={10}>
            {colors.map((color) => (
              <RoundedRectangle
                key={color}
                cornerRadius={10}
                modifiers={tile(color, 110, 64).scrollTransition(undefined, {
                  axis: 'horizontal',
                  transition: (effect, phase) => effect.opacity(Scalars.select(phase.isIdentity, 1, 0.25)).scaleEffect(Scalars.select(phase.isIdentity, 1, 0.75)),
                })}
              />
            ))}
          </HStack>
        </ScrollView>
      </Row>
      <Row name="symbolEffect" hint="Every effect in Apple's Symbols SDK. The first loops; the second bounces when the value changes.">
        <HStack spacing={20}>
          <Image systemName="wifi" modifiers={compose().font('title').symbolEffect('variableColor.iterative')} />
          <Image systemName="heart.fill" modifiers={compose().font('title').foregroundStyle('red').symbolEffect('bounce', { value: taps })} />
          <Button onPress={() => setTaps(taps + 1)}>Bounce</Button>
        </HStack>
      </Row>
    </Section>
  );
}

function Animation() {
  return (
    <Section title="Animation">
      <Row name="keyframeAnimator" hint="Two tracks with their own timing, interpolated by SwiftUI on every frame.">
        <RoundedRectangle
          cornerRadius={8}
          modifiers={tile('indigo', 44, 44).keyframeAnimator({
            initialValue: { y: 0, scale: 1 },
            content: (value) => compose().scaleEffect(value.scale).offset({ y: value.y }),
            keyframes: {
              y: [
                { kind: 'spring', to: -14, duration: 0.3 },
                { kind: 'spring', to: 0, duration: 0.4 },
                { kind: 'linear', to: 0, duration: 0.6 },
              ],
              scale: [
                { kind: 'cubic', to: 1.25, duration: 0.3 },
                { kind: 'cubic', to: 1, duration: 1 },
              ],
            },
          }).padding({ top: 20, bottom: 8, leading: 8 })}
        />
      </Row>
      <Row name="phaseAnimator" hint="Moves through three phases, for as long as it is on screen.">
        <RoundedRectangle
          cornerRadius={8}
          modifiers={tile('teal', 44, 44).phaseAnimator([0, 1, 2], {
            content: (phase) => compose().offset({ x: phase.times(60) }),
            animation: { returns: 'easeInOut' },
          })}
        />
      </Row>
    </Section>
  );
}

function Reading() {
  const [width, setWidth] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [ticks, setTicks] = useState(0);
  const [key, setKey] = useState('none');
  return (
    <Section title="Reading SwiftUI">
      <Row name="onGeometryChange" hint={`Measured by SwiftUI: this row's text is ${width === null ? '...' : Math.round(width)} points wide.`}>
        <Text modifiers={compose().onGeometryChange({ of: (proxy) => proxy.size.width, action: (value: number) => setWidth(value) })}>Measure this text</Text>
      </Row>
      <Row name="onScrollGeometryChange" hint={`Scroll offset: ${Math.round(offset)}`}>
        <ScrollView axes="horizontal" modifiers={compose().frame({ height: 40 }).onScrollGeometryChange({ of: (geometry) => geometry.contentOffset.x, action: (_: number, value: number) => setOffset(value) })}>
          <HStack spacing={8}>
            {colors.map((color) => (
              <RoundedRectangle key={color} cornerRadius={6} modifiers={tile(color, 120, 36)} />
            ))}
          </HStack>
        </ScrollView>
      </Row>
      <Row name="onReceive" hint={`A timer publisher has fired ${ticks} times.`}>
        <Text modifiers={compose().onReceive({ every: 1 }, { perform: () => setTicks((count) => count + 1) })}>Ticking every second</Text>
      </Row>
      <Row name="onKeyPress" hint={`Needs a hardware keyboard and focus. The answer is declared up front, so it is always 'handled'. Last key: ${key}`}>
        <Text modifiers={compose().focusable().onKeyPress({ phases: 'down', action: { returns: 'handled', perform: (press) => setKey(String(press.key)) } })}>Focus me and press a key</Text>
      </Row>
    </Section>
  );
}

function Environment() {
  const [preference, setPreference] = useState<unknown>('none');
  return (
    <Section title="Environment">
      <Row name="transformEnvironment" hint="Replaces the font in the environment for what is below it.">
        <VStack modifiers={compose().transformEnvironment('font', { transform: 'title3' })}>
          <Text>Font from the environment</Text>
        </VStack>
      </Row>
      <Row name="transformPreference" hint={`The parent reads the value set here: ${String(preference)}`}>
        <VStack modifiers={compose().onPreferenceChange('demo', { perform: (value) => setPreference(value) })}>
          <Text modifiers={compose().transformPreference('demo', 'replaced')}>Sets a preference</Text>
        </VStack>
      </Row>
      <Row name="defaultAppStorage" hint="AppStorage below this view reads and writes this suite.">
        <Text modifiers={compose().defaultAppStorage('group.demo')}>Stored in group.demo</Text>
      </Row>
      <Row name="asyncImageURLSession" hint="AsyncImage below this view loads through this session.">
        <Text modifiers={compose().asyncImageURLSession('ephemeral')}>Ephemeral session</Text>
      </Row>
    </Section>
  );
}

function Clipboard() {
  const [pasted, setPasted] = useState('nothing');
  return (
    <Section title="Copy and paste">
      <Row name="copyable" hint="Takes part in the Copy command. iPadOS and hardware keyboards use it.">
        <Text modifiers={compose().focusable().copyable(['Copied text'])}>Copy me</Text>
      </Row>
      <Row name="cuttable" hint="Takes part in the Cut command.">
        <Text modifiers={compose().focusable().cuttable({ action: ['Cut text'] })}>Cut me</Text>
      </Row>
      <Row name="pasteDestination" hint={`Pasted so far: ${pasted}`}>
        <Text modifiers={compose().focusable().pasteDestination({ action: (items: unknown[]) => setPasted(items.join(', ')) })}>Paste here</Text>
      </Row>
    </Section>
  );
}

function DragAndDrop() {
  const [dropped, setDropped] = useState('nothing');
  const [targeted, setTargeted] = useState('no');
  const isTargeted = useBinding(false);
  return (
    <Section title="Drag and drop">
      <Row name="onDrag" hint="Long-press and drag this text onto a drop target below.">
        <Text modifiers={compose().padding(8).background('yellow').onDrag('Dragged with onDrag')}>Drag me</Text>
      </Row>
      <Row name="itemProvider" hint="Offers text to system services and drags.">
        <Text modifiers={compose().itemProvider('Offered text')}>Provides an item</Text>
      </Row>
      <Row name="dropDestination" hint={`Receives the dragged text. Dropped: ${dropped}`}>
        <Text modifiers={compose().padding(8).background('mint').dropDestination({ action: (items: unknown[]) => setDropped(items.join(', ')) })}>Drop here</Text>
      </Row>
      <Row name="onDrop" hint={`Older API: JavaScript learns a drop happened, not what it held. Use dropDestination to read it. Dropped on: ${targeted}`}>
        <Text modifiers={compose().padding(8).background('cyan').onDrop({ of: ['public.text'], isTargeted, perform: { returns: true, perform: () => setTargeted('yes') } })}>Drop here too</Text>
      </Row>
      <Row name="dropConfiguration" hint="Declares a copy operation for drops on this view.">
        <Text modifiers={compose().dropConfiguration({ returns: { operation: 'copy' } })}>Copies on drop</Text>
      </Row>
      <Row name="dragContainer" hint="Limitation: the payload is declared up front, so every item drags the same value.">
        <Text modifiers={compose().dragContainer({ payload: { returns: ['Same for every item'] } })}>Container</Text>
      </Row>
      <Row name="dragContainerSelection" hint="The ids a multi-item drag starts from.">
        <Text modifiers={compose().dragContainerSelection(['apple', 'kiwi'])}>Selected items</Text>
      </Row>
      <Row name="reorderContainer" hint="Reports moves as sources and a destination.">
        <VStack alignment="leading" modifiers={compose().reorderContainer({ move: () => {} })}>
          {fruits.map((fruit) => (
            <Text key={fruit.id}>{fruit.name}</Text>
          ))}
        </VStack>
      </Row>
    </Section>
  );
}

function System() {
  const dialog = useBinding(false);
  const exporter = useBinding(false);
  const customization = useBinding({});
  const [exported, setExported] = useState('not yet');
  return (
    <Section title="System">
      <Row name="dialogIcon" hint="The icon of the confirmation dialog.">
        <Button
          onPress={() => dialog.setValue(true)}
          modifiers={compose()
            .confirmationDialog('Delete this?', { isPresented: dialog, actions: <Button role="destructive" onPress={() => {}}>Delete</Button> })
            .dialogIcon({ systemName: 'trash' })}
        >
          Show dialog
        </Button>
      </Row>
      <Row name="fileExporter" hint={`Opens the system file exporter. Result: ${exported}`}>
        <Button
          onPress={() => exporter.setValue(true)}
          modifiers={compose().fileExporter({ isPresented: exporter, item: 'Exported text', contentTypes: ['public.plain-text'], defaultFilename: 'demo', onCompletion: () => setExported('finished') })}
        >
          Export a file
        </Button>
      </Row>
      <Row name="userActivity" hint="Advertises this screen to Handoff and Spotlight.">
        <Text modifiers={compose().userActivity('com.demo.reading', { update: { title: 'Reading the demo', isEligibleForHandoff: true } })}>Advertised</Text>
      </Row>
      <Row name="onContinueUserActivity" hint="Called when the system continues that activity here.">
        <Text modifiers={compose().onContinueUserActivity('com.demo.reading', { perform: () => {} })}>Waiting for a handoff</Text>
      </Row>
      <Row name="tabViewCustomization" hint="Keeps the user's tab order in a value JavaScript can store.">
        <Text modifiers={compose().tabViewCustomization(customization as never)}>Applies to a TabView</Text>
      </Row>
      <Row name="accessibilityRotor" hint="With VoiceOver on, the rotor lists these rows by name.">
        <Text modifiers={compose().accessibilityRotor('Fruit', { entries: fruits, entryLabel: 'name' })}>Rotor of three fruits</Text>
      </Row>
    </Section>
  );
}

export default function NewModifiersScreen() {
  // React Navigation's header only insets its own scroll views, not a SwiftUI one.
  const { top } = useSafeAreaInsets();
  return (
    <Form modifiers={compose().contentMargins('top', top + NAVIGATION_BAR_HEIGHT)}>
      <Section>
        <HStack>
          <Text modifiers={compose().font('headline')}>33 new modifiers</Text>
          <Spacer />
          <Image systemName="sparkles" modifiers={compose().foregroundStyle('purple')} />
        </HStack>
      </Section>
      <Layout />
      <Effects />
      <Animation />
      <Reading />
      <Environment />
      <Clipboard />
      <DragAndDrop />
      <System />
    </Form>
  );
}
