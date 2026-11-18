import { useFonts } from 'expo-font';
import { useState } from 'react';
import {
  Button,
  Circle,
  ForEach,
  Form,
  Gauge,
  HStack,
  Image,
  LabeledContent,
  NavigationStack,
  Section,
  Spacer,
  SwiftUI,
  Text,
  VStack,
  compose,
  withAnimation,
} from 'swiftui-react-native';

const hsb = (hue: number, saturation: number, brightness: number): SwiftUI.Color => ({ hue, saturation, brightness });
const clay = hsb(0.04, 0.54, 0.78);
const serif = (size: number): SwiftUI.Font => ({ custom: { name: 'GeistSerif', size } });

type Habit = { id: string; name: string; symbol: string; color: SwiftUI.Color; streak: number; done: boolean };

const initial: Habit[] = [
  { id: 'read', name: 'Read 20 pages', symbol: 'book.closed.fill', color: clay, streak: 12, done: true },
  { id: 'walk', name: 'Morning walk', symbol: 'figure.walk', color: hsb(0.28, 0.3, 0.55), streak: 8, done: true },
  { id: 'stretch', name: 'Stretch', symbol: 'figure.cooldown', color: hsb(0.1, 0.45, 0.72), streak: 3, done: false },
  { id: 'journal', name: 'Write three lines', symbol: 'pencil.line', color: hsb(0.6, 0.35, 0.45), streak: 21, done: true },
  { id: 'phone', name: 'No phone after ten', symbol: 'moon.fill', color: hsb(0.0, 0.3, 0.7), streak: 0, done: false },
];

const week = [
  { day: 'M', state: 'done' },
  { day: 'T', state: 'done' },
  { day: 'W', state: 'missed' },
  { day: 'T', state: 'done' },
  { day: 'F', state: 'done' },
  { day: 'S', state: 'done' },
  { day: 'S', state: 'today' },
] as const;

function Week() {
  return (
    <HStack modifiers={compose().padding('vertical', 6)}>
      <ForEach data={week.map((entry, index) => ({ ...entry, id: index }))} id="id">
        {({ day, state }) => (
          <VStack spacing={10} modifiers={compose().frame({ maxWidth: Infinity })}>
            <Text modifiers={compose().font('caption').fontWeight('semibold').foregroundStyle(state === 'today' ? 'primary' : 'secondary')}>
              {day}
            </Text>
            {state === 'today' ? (
              <Circle modifiers={compose().strokeBorder(clay, { lineWidth: 2.5 }).frame({ width: 30, height: 30 })} />
            ) : (
              <Circle
                modifiers={compose()
                  .fill(state === 'done' ? clay : 'quaternary')
                  .frame({ width: 30, height: 30 })
                  .overlay({
                    content:
                      state === 'done' ? (
                        <Image systemName="checkmark" modifiers={compose().font('caption').fontWeight('bold').foregroundStyle('white')} />
                      ) : null,
                  })}
              />
            )}
          </VStack>
        )}
      </ForEach>
    </HStack>
  );
}

function Row({ habit, onToggle }: { habit: Habit; onToggle: () => void }) {
  return (
    <HStack spacing={14}>
      <Image
        systemName={habit.symbol}
        modifiers={compose().font('title3').foregroundStyle(habit.color).frame({ width: 30 })}
      />
      <VStack alignment="leading" spacing={2}>
        <Text modifiers={compose().lineLimit(1)}>{habit.name}</Text>
        <Text
          modifiers={compose()
            .font('footnote')
            .foregroundStyle('secondary')
            .contentTransition({ numericText: { value: habit.streak } })}
        >
          {habit.streak === 0 ? 'Start a streak today' : `${habit.streak} day streak`}
        </Text>
      </VStack>
      <Spacer />
      <Button onPress={onToggle} modifiers={compose().buttonStyle('plain')}>
        <Image
          systemName={habit.done ? 'checkmark.circle.fill' : 'circle'}
          modifiers={compose()
            .font('title')
            .fontWeight('light')
            .foregroundStyle(habit.done ? habit.color : 'tertiary')
            .contentTransition('symbolEffect')
            .symbolEffect('bounce', { value: habit.done })}
        />
      </Button>
    </HStack>
  );
}

export default function Habits() {
  const [habits, setHabits] = useState(initial);
  const [glasses, setGlasses] = useState(6);
  const [fontsLoaded] = useFonts({
    GeistSerif: require('../assets/fonts/GeistSerif-Regular.ttf'),
  });
  if (!fontsLoaded) return null;

  const done = habits.filter((habit) => habit.done).length;
  const toggle = (id: string) =>
    withAnimation('snappy', () =>
      setHabits((list) =>
        list.map((habit) =>
          habit.id === id
            ? { ...habit, done: !habit.done, streak: habit.streak + (habit.done ? -1 : 1) }
            : habit
        )
      )
    );

  const header = (
    <HStack alignment="bottom" modifiers={compose().padding({ top: 8, bottom: 8, leading: 20, trailing: 20 })}>
      <VStack alignment="leading" spacing={2}>
        <Text modifiers={compose().font('footnote').fontWeight('semibold').foregroundStyle('secondary')}>
          SUNDAY, 15 NOVEMBER
        </Text>
        <Text modifiers={compose().font(serif(40))}>Habits</Text>
      </VStack>
      <Spacer />
      <Button
        onPress={() => {}}
        modifiers={compose().buttonStyle('glass').buttonBorderShape('circle').controlSize('large')}
      >
        <Image systemName="plus" modifiers={compose().font('title3').frame({ width: 28, height: 28 })} />
      </Button>
    </HStack>
  );

  return (
    <NavigationStack>
      <Form
        modifiers={compose()
          .tint(clay)
          .toolbarVisibility('hidden', { for: ['navigationBar'] })
          .safeAreaBar({ edge: 'top', content: header })}
      >
        <Section title="This week">
          <Week />
        </Section>

        <Section title={`Today · ${done} of ${habits.length}`}>
          <ForEach data={habits} id="id">
            {(habit) => <Row habit={habit} onToggle={() => toggle(habit.id)} />}
          </ForEach>
          <HStack spacing={14}>
            <Image systemName="drop.fill" modifiers={compose().font('title3').foregroundStyle(hsb(0.55, 0.4, 0.7)).frame({ width: 30 })} />
            <VStack alignment="leading" spacing={2}>
              <Text>Water</Text>
              <Text
                modifiers={compose()
                  .font('footnote')
                  .foregroundStyle('secondary')
                  .contentTransition({ numericText: { value: glasses } })}
              >
                {`${glasses} of 8 glasses`}
              </Text>
            </VStack>
            <Spacer />
            <Button onPress={() => withAnimation('snappy', () => setGlasses((n) => (n + 1) % 9))} modifiers={compose().buttonStyle('plain')}>
              <Gauge
                value={glasses / 8}
                currentValueLabel={
                  <Text modifiers={compose().contentTransition({ numericText: { value: glasses } })}>{`${glasses}`}</Text>
                }
                modifiers={compose().gaugeStyle('accessoryCircularCapacity').tint(hsb(0.55, 0.4, 0.7)).scaleEffect(0.62)}
              >
                <Text>Water</Text>
              </Gauge>
            </Button>
          </HStack>
        </Section>

        <Section title="Highlights">
          <LabeledContent value="21 days">Longest streak</LabeledContent>
          <LabeledContent value="86%">This month</LabeledContent>
        </Section>
      </Form>
    </NavigationStack>
  );
}
