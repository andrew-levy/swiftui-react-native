import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  Circle,
  compose,
  HStack,
  Image,
  List,
  NavigationStack,
  RoundedRectangle,
  Section,
  Spacer,
  SwiftUI,
  Text,
  ToolbarItem,
  VStack,
  withAnimation,
  withTransaction,
} from 'swiftui-react-native';

const curves: { title: string; animation: SwiftUI.Animation }[] = [
  { title: 'Spring', animation: 'spring' },
  { title: 'Bouncy', animation: 'bouncy' },
  { title: 'Ease in and out', animation: { easeInOut: { duration: 0.8 } } },
  { title: 'Linear', animation: { linear: { duration: 0.8 } } },
];

function Curves() {
  const [wide, setWide] = useState(false);
  return (
    <Section title="withAnimation">
      <RoundedRectangle
        cornerRadius={12}
        modifiers={compose()
          .foregroundStyle(wide ? 'indigo' : 'teal')
          .frame({ width: wide ? 280 : 90, height: 44 })
          .frame({ maxWidth: Infinity, alignment: 'leading' })}
      />
      {curves.map(({ title, animation }) => (
        <Button
          key={title}
          onPress={() =>
            withAnimation(animation, () => setWide((value) => !value))
          }
        >
          {title}
        </Button>
      ))}
      <Button
        onPress={() =>
          withTransaction({ disablesAnimations: true }, () =>
            setWide((value) => !value)
          )
        }
      >
        No animation (withTransaction)
      </Button>
    </Section>
  );
}

function Completion() {
  const [on, setOn] = useState(false);
  const [status, setStatus] = useState('Not started');
  const run = () => {
    const started = Date.now();
    setStatus('Animating…');
    withAnimation(
      { easeInOut: { duration: 1 } },
      () => setOn((value) => !value),
      {
        completion: () =>
          setStatus(`Finished after ${Date.now() - started} ms`),
      }
    );
  };
  return (
    <Section title="Completion">
      <HStack>
        <Circle
          modifiers={compose()
            .foregroundStyle(on ? 'green' : 'orange')
            .frame({ width: 36, height: 36 })
            .scaleEffect(on ? 1 : 0.5)}
        />
        <Spacer />
        <Text modifiers={compose().foregroundStyle('secondary')}>{status}</Text>
      </HStack>
      <Button onPress={run}>Run for one second</Button>
    </Section>
  );
}

function Implicit() {
  const [liked, setLiked] = useState(false);
  return (
    <Section title="animation(_:value:)">
      <HStack>
        <Image
          systemName={liked ? 'heart.fill' : 'heart'}
          modifiers={compose()
            .font('title')
            .foregroundStyle(liked ? 'pink' : 'secondary')
            .scaleEffect(liked ? 1.4 : 1)
            .animation('bouncy', { value: liked })}
        />
        <Spacer />
        <Button onPress={() => setLiked((value) => !value)}>
          {liked ? 'Unlike' : 'Like'}
        </Button>
      </HStack>
    </Section>
  );
}

const slideAndFade = SwiftUI.AnyTransition.slide.combined({ with: 'opacity' });

function Transitions() {
  const [visible, setVisible] = useState(true);
  return (
    <Section title="Transitions">
      <VStack
        modifiers={compose().frame({ maxWidth: Infinity, minHeight: 60 })}
      >
        {visible && (
          <Text
            modifiers={compose()
              .font('headline')
              .padding(12)
              .transition(slideAndFade)}
          >
            Hello from SwiftUI
          </Text>
        )}
      </VStack>
      <Button
        onPress={() =>
          withAnimation('smooth', () => setVisible((value) => !value))
        }
      >
        {visible ? 'Hide' : 'Show'}
      </Button>
    </Section>
  );
}

function ContentTransition() {
  const [count, setCount] = useState(0);
  return (
    <Section title="contentTransition">
      <HStack>
        <Text
          modifiers={compose()
            .font('largeTitle')
            .monospacedDigit()
            .contentTransition({ numericText: { value: count } })}
        >
          {count}
        </Text>
        <Spacer />
        {/* A row with several buttons needs this: by default a tap on the row presses all of them. */}
        <Button
          modifiers={compose().buttonStyle('borderless')}
          onPress={() =>
            withAnimation('snappy', () => setCount((value) => value - 1))
          }
        >
          Less
        </Button>
        <Button
          modifiers={compose().buttonStyle('borderless')}
          onPress={() =>
            withAnimation('snappy', () => setCount((value) => value + 1))
          }
        >
          More
        </Button>
      </HStack>
    </Section>
  );
}

function Repeating() {
  const [spinning, setSpinning] = useState(false);
  const spin = SwiftUI.Animation.linear({ duration: 2 }).repeatForever({
    autoreverses: false,
  });
  return (
    <Section title="Repeating">
      <HStack>
        <Image
          systemName="arrow.clockwise"
          modifiers={compose()
            .font('title')
            .rotationEffect({ degrees: spinning ? 360 : 0 })
            .animation(spinning ? spin : 'default', { value: spinning })}
        />
        <Spacer />
        <Button onPress={() => setSpinning((value) => !value)}>
          {spinning ? 'Stop' : 'Spin'}
        </Button>
      </HStack>
    </Section>
  );
}

function Drag() {
  const [offset, setOffset] = useState({ width: 0, height: 0 });
  const gesture = SwiftUI.DragGesture({ minimumDistance: 0 })
    .onChanged((value) => setOffset(value.translation))
    .onEnded(() =>
      withAnimation('bouncy', () => setOffset({ width: 0, height: 0 }))
    );
  return (
    <Section title="DragGesture">
      <VStack
        modifiers={compose().frame({ maxWidth: Infinity, minHeight: 140 })}
      >
        <Circle
          modifiers={compose()
            .foregroundStyle('blue')
            .frame({ width: 64, height: 64 })
            .offset(offset)
            .gesture(gesture)}
        />
      </VStack>
    </Section>
  );
}

export default function AnimationsScreen() {
  const router = useRouter();
  return (
    <NavigationStack>
      <List
        modifiers={compose()
          .navigationTitle('Animations')
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
        <Curves />
        <Completion />
        <Implicit />
        <Transitions />
        <ContentTransition />
        <Repeating />
        <Drag />
      </List>
    </NavigationStack>
  );
}
