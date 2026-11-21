import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, type ReactNode } from 'react';
import {
  Button,
  DatePicker,
  DisclosureGroup,
  Divider,
  ForEach,
  Form,
  Gauge,
  HStack,
  Image,
  LabeledContent,
  LazyVGrid,
  List,
  Menu,
  NavigationStack,
  Picker,
  ProgressView,
  RoundedRectangle,
  Section,
  SecureField,
  Slider,
  Spacer,
  Stepper,
  SwiftUI,
  Tab,
  TabView,
  Text,
  TextField,
  Toggle,
  ToolbarItem,
  VStack,
  compose,
  useBinding,
  withAnimation,
} from 'swiftui-react-native';

// Clips for the launch video: most loop on their own, so start a screen recording and trim.
// Menus open only on a real touch: tap or long-press those while recording.
// Open one with `xcrun simctl openurl booted 'swiftui-rn-example://clips?c=count'`.

function useTick(interval: number, animation: SwiftUI.Animation) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => withAnimation(animation, () => setTick((n) => n + 1)),
      interval
    );
    return () => clearInterval(id);
  }, [interval]);
  return tick;
}

const fixed = <T,>(value: T) => ({ value, setValue: () => {} });
const grouped = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function Stage({ children }: { children: ReactNode }) {
  return (
    <VStack
      modifiers={compose()
        .frame({ maxWidth: Infinity, maxHeight: Infinity })
        .background('white')}
    >
      {children}
    </VStack>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return <Form modifiers={compose().scrollDisabled(true)}>{children}</Form>;
}

function Modifiers() {
  const step = useTick(1400, 'smooth') % 6;
  return (
    <Stage>
      <Text
        modifiers={compose()
          .font({
            system: {
              size: step >= 1 ? 48 : 22,
              weight: step >= 2 ? 'bold' : 'regular',
            },
          })
          .italic(step >= 3)
          .contentTransition('interpolate')
          .foregroundStyle(step >= 4 ? 'white' : 'black')
          .padding(
            step >= 4
              ? { top: 20, bottom: 20, leading: 32, trailing: 32 }
              : { top: 0, bottom: 0, leading: 0, trailing: 0 }
          )
          .background(step >= 4 ? 'black' : 'white', {
            in: {
              rect: { cornerRadius: step >= 5 ? 48 : 18, style: 'continuous' },
            },
          })
          .rotationEffect({ degrees: step >= 5 ? -6 : 0 })}
      >
        Hello, SwiftUI
      </Text>
    </Stage>
  );
}

const counts = [0, 7, 42, 128, 1024, 4096, 10000];

function Count() {
  const value = counts[useTick(1100, 'snappy') % counts.length];
  return (
    <Stage>
      <Text
        modifiers={compose()
          .font({ system: { size: 120, weight: 'semibold' } })
          .monospacedDigit()
          .foregroundStyle('black')
          .contentTransition({ numericText: { value } })}
      >
        {grouped(value)}
      </Text>
    </Stage>
  );
}

const symbols = [
  'bell',
  'bell.slash',
  'speaker.wave.3',
  'speaker.slash',
  'eye',
  'eye.slash',
];

function Replace() {
  const name = symbols[useTick(1200, 'smooth') % symbols.length];
  return (
    <Stage>
      <Image
        systemName={name}
        modifiers={compose()
          .font({ system: { size: 120 } })
          .foregroundStyle('black')
          .contentTransition('symbolEffect')}
      />
    </Stage>
  );
}

const effects = [
  { symbol: 'bell.fill', effect: 'bounce' },
  { symbol: 'hand.wave.fill', effect: 'wiggle' },
  { symbol: 'gearshape.fill', effect: 'rotate' },
  { symbol: 'wifi', effect: 'variableColor.iterative' },
];

function Effects() {
  const tick = useTick(900, 'default');
  return (
    <Stage>
      <HStack spacing={36}>
        {effects.map(({ symbol, effect }, index) => (
          <Image
            key={symbol}
            systemName={symbol}
            modifiers={compose()
              .font({ system: { size: 48 } })
              .foregroundStyle('black')
              .symbolEffect(effect, {
                value: Math.floor(
                  (tick + effects.length - 1 - index) / effects.length
                ),
              })}
          />
        ))}
      </HStack>
    </Stage>
  );
}

const shapes = [
  { width: 120, height: 120, radius: 28 },
  { width: 120, height: 120, radius: 60 },
  { width: 280, height: 120, radius: 60 },
  { width: 280, height: 280, radius: 44 },
];

function Shape() {
  const { width, height, radius } =
    shapes[useTick(1300, 'bouncy') % shapes.length];
  return (
    <Stage>
      <RoundedRectangle
        cornerRadius={radius}
        roundedCornerStyle="continuous"
        modifiers={compose().fill('black').frame({ width, height })}
      />
    </Stage>
  );
}

const switches = [
  { title: 'Wi-Fi', symbol: 'wifi' },
  { title: 'Bluetooth', symbol: 'dot.radiowaves.left.and.right' },
  { title: 'Airplane Mode', symbol: 'airplane' },
  { title: 'Focus', symbol: 'moon.fill' },
];

function Toggles() {
  const step = useTick(700, 'snappy') % (switches.length * 2);
  const on = (index: number) =>
    step <= switches.length ? index < step : index >= step - switches.length;
  return (
    <Panel>
      <Section>
        {switches.map(({ title, symbol }, index) => (
          <Toggle key={title} systemImage={symbol} isOn={fixed(on(index))}>
            {title}
          </Toggle>
        ))}
      </Section>
    </Panel>
  );
}

const levels = [0.2, 0.85, 0.45, 1, 0.1];

function Level() {
  const level = levels[useTick(1300, 'smooth') % levels.length];
  const percent = Math.round(level * 100);
  return (
    <Panel>
      <Section>
        <VStack alignment="leading" spacing={10}>
          <HStack>
            <Text>Brightness</Text>
            <Spacer />
            <Text
              modifiers={compose()
                .monospacedDigit()
                .foregroundStyle('secondary')
                .contentTransition({ numericText: { value: percent } })}
            >
              {`${percent}%`}
            </Text>
          </HStack>
          <Slider value={fixed(level)} in={[0, 1]} />
        </VStack>
      </Section>
    </Panel>
  );
}

const ranges = [
  { id: 'D', bars: [0.3, 0.5, 0.4, 0.8, 0.6, 0.9, 0.5] },
  { id: 'W', bars: [0.6, 0.4, 0.7, 0.5, 0.9, 0.3, 0.6] },
  { id: 'M', bars: [0.9, 0.7, 0.5, 0.6, 0.4, 0.5, 0.8] },
  { id: 'Y', bars: [0.4, 0.6, 0.8, 0.7, 0.9, 1, 0.95] },
];

function Segmented() {
  const range = ranges[useTick(1500, 'smooth') % ranges.length];
  return (
    <Panel>
      <Section>
        <Picker
          title="Range"
          selection={fixed(range.id)}
          modifiers={compose().pickerStyle('segmented')}
        >
          {ranges.map(({ id }) => (
            <Text key={id} modifiers={compose().tag(id)}>
              {id}
            </Text>
          ))}
        </Picker>
        <HStack
          alignment="bottom"
          spacing={10}
          modifiers={compose()
            .frame({ height: 160 })
            .padding({ top: 8, bottom: 8 })}
        >
          {range.bars.map((bar, index) => (
            <RoundedRectangle
              key={index}
              cornerRadius={6}
              roundedCornerStyle="continuous"
              modifiers={compose()
                .fill('black')
                .frame({ maxWidth: Infinity })
                .frame({ height: 144 * bar })}
            />
          ))}
        </HStack>
      </Section>
    </Panel>
  );
}

const views = [
  { id: 'text', title: 'Text', symbol: 'textformat' },
  { id: 'image', title: 'Image', symbol: 'photo' },
  { id: 'toggle', title: 'Toggle', symbol: 'switch.2' },
  { id: 'slider', title: 'Slider', symbol: 'slider.horizontal.3' },
  { id: 'list', title: 'List', symbol: 'list.bullet' },
];

function Rows() {
  const step = useTick(800, 'smooth') % (views.length + 3);
  return (
    <Panel>
      <Section title="Views">
        <ForEach data={views.slice(0, Math.min(step, views.length))} id="id">
          {({ title, symbol }) => (
            <HStack spacing={14}>
              <Image
                systemName={symbol}
                modifiers={compose()
                  .foregroundStyle('black')
                  .frame({ width: 28 })}
              />
              <Text>{title}</Text>
            </HStack>
          )}
        </ForEach>
      </Section>
    </Panel>
  );
}

const progress = [0, 0.25, 0.5, 0.8, 1, 1];

function Download() {
  const value = progress[useTick(1000, 'smooth') % progress.length];
  const done = value === 1;
  return (
    <Panel>
      <Section>
        <HStack spacing={14}>
          <Image
            systemName={done ? 'checkmark.circle.fill' : 'arrow.down.circle'}
            modifiers={compose()
              .font('title2')
              .foregroundStyle('black')
              .contentTransition('symbolEffect')}
          />
          <VStack alignment="leading" spacing={8}>
            <HStack>
              <Text>{done ? 'Downloaded' : 'Downloading'}</Text>
              <Spacer />
              <Text
                modifiers={compose()
                  .monospacedDigit()
                  .foregroundStyle('secondary')
                  .contentTransition({
                    numericText: { value: Math.round(value * 100) },
                  })}
              >
                {`${Math.round(value * 100)}%`}
              </Text>
            </HStack>
            <ProgressView value={value} />
          </VStack>
        </HStack>
      </Section>
    </Panel>
  );
}

function Glass() {
  const playing = useTick(1200, 'snappy') % 2 === 1;
  const round = compose()
    .buttonStyle('glass')
    .buttonBorderShape('circle')
    .controlSize('large');
  return (
    <Stage>
      <HStack spacing={20}>
        <Button onPress={() => {}} modifiers={round}>
          <Image
            systemName="backward.fill"
            modifiers={compose()
              .font('title2')
              .frame({ width: 44, height: 44 })}
          />
        </Button>
        <Button onPress={() => {}} modifiers={round}>
          <Image
            systemName={playing ? 'pause.fill' : 'play.fill'}
            modifiers={compose()
              .font('largeTitle')
              .frame({ width: 64, height: 64 })
              .contentTransition('symbolEffect')}
          />
        </Button>
        <Button onPress={() => {}} modifiers={round}>
          <Image
            systemName="forward.fill"
            modifiers={compose()
              .font('title2')
              .frame({ width: 44, height: 44 })}
          />
        </Button>
      </HStack>
    </Stage>
  );
}

function Context() {
  return (
    <Stage>
      <RoundedRectangle
        cornerRadius={36}
        roundedCornerStyle="continuous"
        modifiers={compose()
          .fill('black')
          .frame({ width: 220, height: 220 })
          .overlay({
            content: (
              <Image
                systemName="swift"
                modifiers={compose()
                  .font({ system: { size: 88 } })
                  .foregroundStyle('white')}
              />
            ),
          })
          .contentShape('contextMenuPreview', { rect: { cornerRadius: 36, style: 'continuous' } })
          .contextMenu({
            menuItems: (
              <>
                <Button systemImage="doc.on.doc" onPress={() => {}}>
                  Copy
                </Button>
                <Button systemImage="square.and.arrow.up" onPress={() => {}}>
                  Share
                </Button>
                <Button systemImage="heart" onPress={() => {}}>
                  Favorite
                </Button>
                <Divider />
                <Button
                  systemImage="trash"
                  role="destructive"
                  onPress={() => {}}
                >
                  Delete
                </Button>
              </>
            ),
          })}
      />
    </Stage>
  );
}

function Options() {
  return (
    <Stage>
      <Menu
        label={
          <Image
            systemName="ellipsis"
            modifiers={compose()
              .font('title2')
              .frame({ width: 52, height: 52 })}
          />
        }
        modifiers={compose()
          .buttonStyle('glass')
          .buttonBorderShape('circle')
          .controlSize('large')
          .menuOrder('fixed')}
      >
        <Button systemImage="square.and.pencil" onPress={() => {}}>
          New Note
        </Button>
        <Button systemImage="pin" onPress={() => {}}>
          Pin
        </Button>
        <Menu title="Sort By" systemImage="arrow.up.arrow.down">
          <Button onPress={() => {}}>Date Edited</Button>
          <Button onPress={() => {}}>Date Created</Button>
          <Button onPress={() => {}}>Title</Button>
        </Menu>
        <Divider />
        <Button systemImage="trash" role="destructive" onPress={() => {}}>
          Delete
        </Button>
      </Menu>
    </Stage>
  );
}

function Pickers() {
  const appearance = useBinding<string>('automatic');
  const repeat = useBinding<string>('never');
  return (
    <Panel>
      <Section>
        <Picker
          title="Appearance"
          systemImage="circle.lefthalf.filled"
          selection={appearance}
          modifiers={compose().pickerStyle('menu')}
        >
          <Text modifiers={compose().tag('light')}>Light</Text>
          <Text modifiers={compose().tag('dark')}>Dark</Text>
          <Text modifiers={compose().tag('automatic')}>Automatic</Text>
        </Picker>
        <Picker
          title="Repeat"
          systemImage="repeat"
          selection={repeat}
          modifiers={compose().pickerStyle('menu')}
        >
          <Text modifiers={compose().tag('never')}>Never</Text>
          <Text modifiers={compose().tag('daily')}>Every Day</Text>
          <Text modifiers={compose().tag('weekly')}>Every Week</Text>
          <Text modifiers={compose().tag('monthly')}>Every Month</Text>
        </Picker>
      </Section>
    </Panel>
  );
}

const minutes = [5, 10, 15, 20, 25, 30, 45, 60];
const picks = [5, 25, 15, 45, 30];

function Wheel() {
  const pick = picks[useTick(1400, 'smooth') % picks.length];
  return (
    <Stage>
      <Picker
        title="Minutes"
        selection={fixed(pick)}
        modifiers={compose()
          .pickerStyle('wheel')
          .labelsHidden()
          .frame({ width: 260 })}
      >
        {minutes.map((minute) => (
          <Text key={minute} modifiers={compose().tag(minute)}>
            {`${minute} min`}
          </Text>
        ))}
      </Picker>
    </Stage>
  );
}

const days = [18, 21, 9, 27, 13].map(
  (day) => new Date(`2026-11-${String(day).padStart(2, '0')}T12:00:00`)
);

function Calendar() {
  const day = days[useTick(1300, 'smooth') % days.length];
  return (
    <Panel>
      <Section>
        <DatePicker
          selection={fixed(day)}
          displayedComponents="date"
          modifiers={compose().datePickerStyle('graphical')}
        >
          Day
        </DatePicker>
      </Section>
    </Panel>
  );
}

const guests = [1, 2, 3, 4, 3, 2];

function Guests() {
  const count = guests[useTick(900, 'snappy') % guests.length];
  return (
    <Panel>
      <Section>
        <Stepper value={fixed(count)} in={[1, 8]}>
          <Text
            modifiers={compose().contentTransition({
              numericText: { value: count },
            })}
          >{`Guests ${count}`}</Text>
        </Stepper>
      </Section>
    </Panel>
  );
}

const email = 'you@example.com';
const password = 'swiftui-rn';

function Fields() {
  const step = useTick(90, 'default') % (email.length + password.length + 24);
  return (
    <Panel>
      <Section>
        <TextField text={fixed(email.slice(0, step))}>Email</TextField>
        <SecureField
          text={fixed(password.slice(0, Math.max(0, step - email.length)))}
        >
          Password
        </SecureField>
      </Section>
    </Panel>
  );
}

function Sheet() {
  const open = useTick(1800, 'smooth') % 2 === 1;
  return (
    <Stage>
      <Button
        onPress={() => {}}
        modifiers={compose()
          .buttonStyle('glass')
          .controlSize('large')
          .sheet({
            isPresented: fixed(open),
            content: (
              <Form
                modifiers={compose()
                  .presentationDetents(['medium'])
                  .presentationDragIndicator('visible')}
              >
                <Section title="Information">
                  <LabeledContent value="7.0">Version</LabeledContent>
                  <LabeledContent value="iOS 26">Platform</LabeledContent>
                  <LabeledContent value="Fabric">Renderer</LabeledContent>
                </Section>
              </Form>
            ),
          })}
      >
        Details
      </Button>
    </Stage>
  );
}

function Dialog() {
  const open = useTick(1800, 'smooth') % 2 === 1;
  return (
    <Stage>
      <Button
        onPress={() => {}}
        modifiers={compose()
          .buttonStyle('glass')
          .controlSize('large')
          .confirmationDialog('Delete this draft?', {
            isPresented: fixed(open),
            titleVisibility: 'visible',
            actions: (
              <Button role="destructive" onPress={() => {}}>
                Delete
              </Button>
            ),
          })}
      >
        Delete Draft
      </Button>
    </Stage>
  );
}

const pages = [
  { value: 'home', title: 'Home', symbol: 'house' },
  { value: 'search', title: 'Search', symbol: 'magnifyingglass' },
  { value: 'library', title: 'Library', symbol: 'books.vertical' },
  { value: 'profile', title: 'Profile', symbol: 'person' },
];

function Tabs() {
  const page = pages[useTick(1400, 'smooth') % pages.length].value;
  return (
    <TabView selection={fixed(page)}>
      {pages.map(({ value, title, symbol }) => (
        <Tab key={value} title={title} systemImage={symbol} value={value}>
          <Stage>
            <Image
              systemName={symbol}
              modifiers={compose()
                .font({ system: { size: 96 } })
                .foregroundStyle('black')}
            />
          </Stage>
        </Tab>
      ))}
    </TabView>
  );
}

function Disclosure() {
  const open = useTick(1400, 'smooth') % 2 === 1;
  return (
    <Panel>
      <Section>
        <DisclosureGroup title="Advanced" isExpanded={fixed(open)}>
          <Toggle isOn={fixed(true)}>Hardware Acceleration</Toggle>
          <Toggle isOn={fixed(false)}>Debug Overlay</Toggle>
          <LabeledContent value="Fabric">Renderer</LabeledContent>
        </DisclosureGroup>
      </Section>
    </Panel>
  );
}

const readings = [0.2, 0.65, 0.9, 0.4];

function Gauges() {
  const value = readings[useTick(1300, 'smooth') % readings.length];
  const percent = Math.round(value * 100);
  const label = (
    <Text
      modifiers={compose().contentTransition({
        numericText: { value: percent },
      })}
    >{`${percent}`}</Text>
  );
  return (
    <Stage>
      <HStack spacing={44} modifiers={compose().scaleEffect(1.6).tint('black')}>
        <Gauge
          value={value}
          currentValueLabel={label}
          modifiers={compose().gaugeStyle('accessoryCircular')}
        />
        <Gauge
          value={value}
          currentValueLabel={label}
          modifiers={compose().gaugeStyle('accessoryCircularCapacity')}
        />
      </HStack>
    </Stage>
  );
}

const tiles = Array.from({ length: 9 }, (_, index) => ({ id: index }));

function Tiles() {
  const step = useTick(110, 'snappy') % (tiles.length + 12);
  return (
    <Stage>
      <LazyVGrid
        columns={[
          { size: { flexible: {} } },
          { size: { flexible: {} } },
          { size: { flexible: {} } },
        ]}
        spacing={12}
        modifiers={compose().frame({ width: 312, height: 312 })}
      >
        {tiles.map(({ id }) => {
          const shown = id < step;
          return (
            <RoundedRectangle
              key={id}
              cornerRadius={20}
              roundedCornerStyle="continuous"
              modifiers={compose()
                .fill('black')
                .frame({ height: 96 })
                .scaleEffect(shown ? 1 : 0.6)
                .opacity(shown ? 1 : 0)}
            />
          );
        })}
      </LazyVGrid>
    </Stage>
  );
}

const clips: {
  id: string;
  title: string;
  api: string;
  Clip: () => ReactNode;
}[] = [
  {
    id: 'modifiers',
    title: 'Modifiers',
    api: 'font · italic · padding · background',
    Clip: Modifiers,
  },
  {
    id: 'count',
    title: 'Count',
    api: 'contentTransition(.numericText)',
    Clip: Count,
  },
  {
    id: 'symbol',
    title: 'Symbol',
    api: 'contentTransition(.symbolEffect)',
    Clip: Replace,
  },
  { id: 'effects', title: 'Effects', api: 'symbolEffect', Clip: Effects },
  {
    id: 'shape',
    title: 'Shape',
    api: 'RoundedRectangle · withAnimation(.bouncy)',
    Clip: Shape,
  },
  { id: 'toggles', title: 'Toggles', api: 'Toggle', Clip: Toggles },
  { id: 'slider', title: 'Slider', api: 'Slider', Clip: Level },
  {
    id: 'segmented',
    title: 'Segmented',
    api: 'Picker · pickerStyle(.segmented)',
    Clip: Segmented,
  },
  { id: 'rows', title: 'Rows', api: 'Form · ForEach', Clip: Rows },
  { id: 'download', title: 'Download', api: 'ProgressView', Clip: Download },
  {
    id: 'context',
    title: 'Context Menu · long-press',
    api: 'contextMenu',
    Clip: Context,
  },
  {
    id: 'menu',
    title: 'Menu · tap',
    api: 'Menu · buttonStyle(.glass)',
    Clip: Options,
  },
  {
    id: 'pickers',
    title: 'Pickers · tap',
    api: 'Picker · pickerStyle(.menu)',
    Clip: Pickers,
  },
  {
    id: 'wheel',
    title: 'Wheel',
    api: 'Picker · pickerStyle(.wheel)',
    Clip: Wheel,
  },
  {
    id: 'calendar',
    title: 'Calendar',
    api: 'DatePicker · datePickerStyle(.graphical)',
    Clip: Calendar,
  },
  { id: 'stepper', title: 'Stepper', api: 'Stepper', Clip: Guests },
  {
    id: 'fields',
    title: 'Fields',
    api: 'TextField · SecureField',
    Clip: Fields,
  },
  {
    id: 'sheet',
    title: 'Sheet',
    api: 'sheet · presentationDetents',
    Clip: Sheet,
  },
  { id: 'dialog', title: 'Dialog', api: 'confirmationDialog', Clip: Dialog },
  { id: 'tabs', title: 'Tabs', api: 'TabView · Tab', Clip: Tabs },
  {
    id: 'disclosure',
    title: 'Disclosure',
    api: 'DisclosureGroup',
    Clip: Disclosure,
  },
  { id: 'gauge', title: 'Gauge', api: 'Gauge · gaugeStyle', Clip: Gauges },
  { id: 'grid', title: 'Grid', api: 'LazyVGrid · scaleEffect · opacity', Clip: Tiles },
  { id: 'glass', title: 'Glass', api: 'buttonStyle(.glass)', Clip: Glass },
];

function Index() {
  const router = useRouter();
  return (
    <NavigationStack>
      <List
        modifiers={compose()
          .navigationTitle('Clips')
          .toolbar({
            content: (
              <ToolbarItem placement="topBarLeading">
                <Button
                  systemImage="chevron.left"
                  onPress={() => router.back()}
                >
                  Back
                </Button>
              </ToolbarItem>
            ),
          })}
      >
        <Section footer="Each clip loops on its own. Swipe back to leave.">
          {clips.map(({ id, title, api }) => (
            <Button key={id} onPress={() => router.push(`/clips?c=${id}`)}>
              <VStack alignment="leading" spacing={2}>
                <Text modifiers={compose().foregroundStyle('primary')}>
                  {title}
                </Text>
                <Text
                  modifiers={compose()
                    .font('footnote')
                    .fontDesign('monospaced')
                    .foregroundStyle('secondary')}
                >
                  {api}
                </Text>
              </VStack>
            </Button>
          ))}
        </Section>
      </List>
    </NavigationStack>
  );
}

export default function Clips() {
  const { c } = useLocalSearchParams<{ c?: string }>();
  const clip = clips.find(({ id }) => id === c);
  if (!clip) return <Index />;
  const { Clip } = clip;
  return (
    <>
      <StatusBar hidden />
      <NavigationStack>
        <VStack
          modifiers={compose()
            .tint('black')
            .preferredColorScheme('light')
            .toolbarVisibility('hidden', { for: ['navigationBar'] })}
        >
          <Clip />
        </VStack>
      </NavigationStack>
    </>
  );
}
