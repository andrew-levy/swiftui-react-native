import { useFonts } from 'expo-font';
import { useLocalSearchParams } from 'expo-router';
import type { ReactNode } from 'react';
import {
  Button,
  Circle,
  DatePicker,
  Divider,
  EmptyView,
  ForEach,
  Form,
  HStack,
  Image,
  LabeledContent,
  NavigationLink,
  NavigationStack,
  Picker,
  ProgressView,
  RoundedRectangle,
  Section,
  Slider,
  Spacer,
  SwiftUI,
  Text,
  Toggle,
  VStack,
  compose,
  useBinding,
} from 'swiftui-react-native';

const hsb = (hue: number, saturation: number, brightness: number): SwiftUI.Color => ({ hue, saturation, brightness });
const clay = hsb(0.04, 0.54, 0.78);
const sage = hsb(0.28, 0.16, 0.67);
const sand = hsb(0.1, 0.23, 0.88);
const ink = hsb(0.6, 0.41, 0.27);
const rose = hsb(0.0, 0.27, 0.85);
const moss = hsb(0.27, 0.29, 0.42);
const serif = (size: number): SwiftUI.Font => ({ custom: { name: 'GeistSerif', size } });

const bare = compose()
  .listRowBackground(<EmptyView />)
  .listRowInsets({ top: 0, leading: 0, bottom: 0, trailing: 0 });

function Calendar() {
  const day = useBinding(new Date('2026-11-18T12:00:00'));
  return (
    <Section>
      <DatePicker selection={day} displayedComponents="date" modifiers={compose().datePickerStyle('graphical')}>
        Day
      </DatePicker>
    </Section>
  );
}

function Wheel() {
  const time = useBinding(new Date('2026-11-18T09:41:00'));
  return (
    <Section title="Reminder">
      <DatePicker
        selection={time}
        displayedComponents="hourAndMinute"
        modifiers={compose().datePickerStyle('wheel').labelsHidden()}
      >
        Time
      </DatePicker>
    </Section>
  );
}

function Icon({ symbol, color }: { symbol: string; color: SwiftUI.Color }) {
  return (
    <RoundedRectangle
      cornerRadius={8}
      roundedCornerStyle="continuous"
      modifiers={compose()
        .fill(color)
        .frame({ width: 30, height: 30 })
        .overlay({
          content: <Image systemName={symbol} modifiers={compose().font('subheadline').fontWeight('semibold').foregroundStyle('white')} />,
        })}
    />
  );
}

function Row({ symbol, color, children }: { symbol: string; color: SwiftUI.Color; children: ReactNode }) {
  return (
    <HStack spacing={14}>
      <Icon symbol={symbol} color={color} />
      {children}
    </HStack>
  );
}

function Settings() {
  const focus = useBinding(true);
  const haptics = useBinding(true);
  const sync = useBinding(false);
  return (
    <Section title="Studio">
      <Row symbol="moon.fill" color={ink}>
        <Toggle isOn={focus}>Focus</Toggle>
      </Row>
      <Row symbol="hand.tap.fill" color={clay}>
        <Toggle isOn={haptics}>Haptics</Toggle>
      </Row>
      <Row symbol="icloud.fill" color={sage}>
        <Toggle isOn={sync}>Sync</Toggle>
      </Row>
      <NavigationLink value="appearance">
        <Row symbol="circle.lefthalf.filled" color={moss}>
          <LabeledContent value="Automatic">Appearance</LabeledContent>
        </Row>
      </NavigationLink>
    </Section>
  );
}

const swatches = [
  { id: 'clay', color: clay },
  { id: 'sage', color: sage },
  { id: 'sand', color: sand },
  { id: 'ink', color: ink },
  { id: 'rose', color: rose },
  { id: 'moss', color: moss },
];

function Swatch() {
  return (
    <>
      <Section>
        <RoundedRectangle
          cornerRadius={0}
          modifiers={compose()
            .foregroundStyle(clay)
            .frame({ height: 170 })
            .overlay({
              alignment: 'bottomLeading',
              content: (
                <VStack alignment="leading" spacing={2} modifiers={compose().padding(20)}>
                  <Text modifiers={compose().font(serif(36))}>Clay</Text>
                  <Text modifiers={compose().font('subheadline').fontDesign('monospaced').opacity(0.8)}>#C77C64</Text>
                </VStack>
              ),
            })
            .foregroundStyle('white')
            .listRowInsets({ top: 0, leading: 0, bottom: 0, trailing: 0 })}
        />
      </Section>
      <Section>
        <HStack>
          <ForEach data={swatches} id="id">
            {({ id, color }) => (
              <Circle
                modifiers={compose()
                  .fill(color)
                  .frame({ width: 34, height: 34 })
                  .padding(4)
                  .overlay({ content: <Circle modifiers={compose().stroke('primary', { lineWidth: 2.5 }).opacity(id === 'clay' ? 1 : 0)} /> })
                  .frame({ maxWidth: Infinity })}
              />
            )}
          </ForEach>
        </HStack>
      </Section>
    </>
  );
}

function Channel({ title, value, display }: { title: string; value: number; display: string }) {
  const binding = useBinding(value);
  return (
    <VStack alignment="leading" spacing={6}>
      <HStack>
        <Text>{title}</Text>
        <Spacer />
        <Text modifiers={compose().monospacedDigit().foregroundStyle('secondary')}>{display}</Text>
      </HStack>
      <Slider value={binding} in={[0, 1]} />
    </VStack>
  );
}

function Controls() {
  const corners = useBinding<string>('soft');
  const favorite = useBinding(true);
  return (
    <>
      <Section title="Color">
        <Channel title="Saturation" value={0.54} display="54%" />
        <Channel title="Brightness" value={0.78} display="78%" />
      </Section>
      <Section title="Style">
        <Picker title="Corners" selection={corners} modifiers={compose().pickerStyle('segmented')}>
          <Text modifiers={compose().tag('soft')}>Soft</Text>
          <Text modifiers={compose().tag('round')}>Round</Text>
          <Text modifiers={compose().tag('sharp')}>Sharp</Text>
        </Picker>
        <Toggle systemImage="heart" isOn={favorite}>
          Favorite
        </Toggle>
      </Section>
    </>
  );
}

function Bubble({ text, mine }: { text: string; mine?: boolean }) {
  return (
    <HStack>
      {mine ? <Spacer minLength={60} /> : null}
      <Text
        modifiers={compose()
          .padding({ top: 10, bottom: 10, leading: 14, trailing: 14 })
          .foregroundStyle(mine ? 'white' : 'primary')
          .background(mine ? clay : 'quinary', { in: { rect: { cornerRadius: 20, style: 'continuous' } } })}
      >
        {text}
      </Text>
      {mine ? null : <Spacer minLength={60} />}
    </HStack>
  );
}

function Messages() {
  return (
    <Section modifiers={bare}>
      <VStack spacing={8} modifiers={compose().padding({ top: 4, bottom: 4 })}>
        <Text modifiers={compose().font('caption').fontWeight('medium').foregroundStyle('secondary')}>Today 9:41</Text>
        <Bubble text="Is the clay swatch final?" />
        <Bubble text="Yes. 14°, 54%, 78%. Shipping it with the soft corners." mine />
      </VStack>
    </Section>
  );
}

function Stat({ title, value, caption }: { title: string; value: string; caption: string }) {
  return (
    <VStack spacing={4} modifiers={compose().frame({ maxWidth: Infinity })}>
      <Text modifiers={compose().font('caption2').fontWeight('semibold').foregroundStyle('secondary')}>{title}</Text>
      <Text modifiers={compose().font('title2').fontWeight('semibold').foregroundStyle('secondary')}>{value}</Text>
      <Text modifiers={compose().font('caption').foregroundStyle('secondary')}>{caption}</Text>
    </VStack>
  );
}

function Store() {
  return (
    <Section>
      <HStack spacing={16} modifiers={compose().padding({ top: 6, bottom: 6 })}>
        <RoundedRectangle
          cornerRadius={22}
          roundedCornerStyle="continuous"
          modifiers={compose()
            .fill(clay)
            .frame({ width: 92, height: 92 })
            .overlay({ content: <Image systemName="paintpalette.fill" modifiers={compose().font('largeTitle').foregroundStyle('white')} /> })}
        />
        <VStack alignment="leading" spacing={2}>
          <Text modifiers={compose().font(serif(26))}>Palette</Text>
          <Text modifiers={compose().font('subheadline').foregroundStyle('secondary')}>Colors, kept simple</Text>
          <Spacer minLength={8} />
          <Button onPress={() => {}} modifiers={compose().buttonStyle('borderedProminent').buttonBorderShape('capsule').fontWeight('semibold')}>
            Open
          </Button>
        </VStack>
        <Spacer />
      </HStack>
      <HStack modifiers={compose().padding({ top: 4, bottom: 4 })}>
        <Stat title="RATINGS" value="4.9" caption="★★★★★" />
        <Divider />
        <Stat title="AGE" value="4+" caption="Years Old" />
        <Divider />
        <Stat title="CHART" value="#1" caption="Design" />
      </HStack>
    </Section>
  );
}

const habits = [
  { id: 'read', name: 'Read 20 pages', symbol: 'book.closed.fill', color: clay, streak: '12 day streak', done: true },
  { id: 'walk', name: 'Morning walk', symbol: 'figure.walk', color: hsb(0.28, 0.3, 0.55), streak: '8 day streak', done: true },
  { id: 'stretch', name: 'Stretch', symbol: 'figure.cooldown', color: hsb(0.1, 0.45, 0.72), streak: '3 day streak', done: false },
];

function Habits() {
  return (
    <Section title="Today · 2 of 3">
      <ForEach data={habits} id="id">
        {(habit) => (
          <HStack spacing={14}>
            <Image systemName={habit.symbol} modifiers={compose().font('title3').foregroundStyle(habit.color).frame({ width: 30 })} />
            <VStack alignment="leading" spacing={2}>
              <Text>{habit.name}</Text>
              <Text modifiers={compose().font('footnote').foregroundStyle('secondary')}>{habit.streak}</Text>
            </VStack>
            <Spacer />
            <Image
              systemName={habit.done ? 'checkmark.circle.fill' : 'circle'}
              modifiers={compose().font('title').fontWeight('light').foregroundStyle(habit.done ? habit.color : 'tertiary')}
            />
          </HStack>
        )}
      </ForEach>
    </Section>
  );
}

function Player() {
  return (
    <Section>
      <HStack spacing={14}>
        <RoundedRectangle
          cornerRadius={10}
          roundedCornerStyle="continuous"
          modifiers={compose()
            .fill(ink)
            .frame({ width: 56, height: 56 })
            .overlay({ content: <Image systemName="waveform" modifiers={compose().font('title2').foregroundStyle(sand)} /> })}
        />
        <VStack alignment="leading" spacing={2}>
          <Text modifiers={compose().font(serif(20))}>Salt & Signal</Text>
          <Text modifiers={compose().font('subheadline').foregroundStyle('secondary')}>Mira Holt</Text>
        </VStack>
        <Spacer />
      </HStack>
      <VStack spacing={6}>
        <ProgressView value={0.38} />
        <HStack>
          <Text modifiers={compose().font('caption').monospacedDigit().foregroundStyle('secondary')}>1:24</Text>
          <Spacer />
          <Text modifiers={compose().font('caption').monospacedDigit().foregroundStyle('secondary')}>-2:17</Text>
        </HStack>
        <HStack spacing={44} modifiers={compose().font('title').foregroundStyle('primary').padding({ top: 4, bottom: 4 })}>
          <Image systemName="backward.fill" />
          <Image systemName="pause.fill" modifiers={compose().font('largeTitle')} />
          <Image systemName="forward.fill" />
        </HStack>
      </VStack>
    </Section>
  );
}

const pieces: Record<string, () => ReactNode> = {
  calendar: Calendar,
  wheel: Wheel,
  settings: Settings,
  swatch: Swatch,
  controls: Controls,
  messages: Messages,
  store: Store,
  habits: Habits,
  player: Player,
};

export default function Banner() {
  const { c = 'calendar' } = useLocalSearchParams<{ c?: string }>();
  const [fontsLoaded] = useFonts({ GeistSerif: require('../assets/fonts/GeistSerif-Regular.ttf') });
  if (!fontsLoaded) return null;
  const Piece = pieces[c] ?? Calendar;

  return (
    <NavigationStack>
      <Form modifiers={compose().tint(clay).toolbarVisibility('hidden', { for: ['navigationBar'] })}>
        <Piece />
      </Form>
    </NavigationStack>
  );
}
