import { useFonts } from 'expo-font';
import {
  Button,
  Divider,
  ForEach,
  HStack,
  Image,
  LazyVStack,
  NavigationStack,
  ProgressView,
  Rectangle,
  RoundedRectangle,
  ScrollView,
  Scalars,
  Spacer,
  SwiftUI,
  Text,
  VStack,
  compose,
} from 'swiftui-react-native';

const hsb = (hue: number, saturation: number, brightness: number): SwiftUI.Color => ({ hue, saturation, brightness });
const serif = (size: number): SwiftUI.Font => ({ custom: { name: 'GeistSerif', size } });
const clay = hsb(0.04, 0.54, 0.78);

type Book = { id: string; title: string; author: string; color: SwiftUI.Color; ink: SwiftUI.Color; progress: number; pages: number };

const reading: Book[] = [
  { id: 'tide', title: 'The Long Tide', author: 'Ines Okafor', color: hsb(0.04, 0.54, 0.78), ink: 'black', progress: 0.64, pages: 412 },
  { id: 'orchard', title: 'Orchard Hours', author: 'Paul Navarro', color: hsb(0.28, 0.2, 0.68), ink: 'black', progress: 0.31, pages: 288 },
  { id: 'salt', title: 'Salt & Signal', author: 'Mira Holt', color: hsb(0.6, 0.41, 0.3), ink: 'white', progress: 0.12, pages: 356 },
  { id: 'paper', title: 'Paper Rooms', author: 'Theo Lind', color: hsb(0.1, 0.23, 0.88), ink: 'black', progress: 0.88, pages: 198 },
];

const next: Book[] = [
  { id: 'north', title: 'North of Quiet', author: 'Ada Brennan', color: hsb(0.27, 0.29, 0.42), ink: 'white', progress: 0, pages: 324 },
  { id: 'glass', title: 'A House of Glass', author: 'Joon Park', color: hsb(0.0, 0.27, 0.85), ink: 'black', progress: 0, pages: 240 },
  { id: 'river', title: 'River Notes', author: 'Clara Weiss', color: hsb(0.08, 0.35, 0.6), ink: 'white', progress: 0, pages: 176 },
];

function Cover({ book, width, height, titleSize }: { book: Book; width: number; height: number; titleSize: number }) {
  return (
    <Rectangle
      modifiers={compose()
        .foregroundStyle(book.color)
        .frame({ width, height })
        .overlay({
          alignment: 'leading',
          content: <Rectangle modifiers={compose().foregroundStyle({ white: 0, opacity: 0.14 }).frame({ width: Math.max(3, width * 0.04) })} />,
        })
        .overlay({
          alignment: 'topLeading',
          content:
            titleSize > 0 ? (
              <VStack alignment="leading" spacing={6} modifiers={compose().padding({ top: 18, leading: 18, trailing: 12 })}>
                <Text modifiers={compose().font(serif(titleSize)).foregroundStyle(book.ink).lineLimit(3)}>{book.title}</Text>
                <Text modifiers={compose().font('caption2').fontWeight('semibold').tracking(1.5).foregroundStyle(book.ink).opacity(0.65)}>
                  {book.author.toUpperCase()}
                </Text>
              </VStack>
            ) : null,
        })
        .clipShape({ rect: { cornerRadius: Math.max(3, width * 0.03) } })
        .shadow({ color: { white: 0, opacity: 0.18 }, radius: 8, y: 4 })}
    />
  );
}

function Shelf() {
  return (
    <ScrollView axes="horizontal" modifiers={compose().scrollIndicators('hidden').scrollClipDisabled()}>
      <HStack alignment="top" spacing={18} modifiers={compose().padding('horizontal', 20)}>
        <ForEach data={reading} id="id">
          {(book) => (
            <VStack
              alignment="leading"
              spacing={10}
              modifiers={compose().scrollTransition(undefined, {
                axis: 'horizontal',
                transition: (effect, phase) => effect.scaleEffect(Scalars.select(phase.isIdentity, 1, 0.92)),
              })}
            >
              <Cover book={book} width={150} height={222} titleSize={22} />
              <ProgressView value={book.progress} modifiers={compose().tint(clay).frame({ width: 150 })} />
              <Text modifiers={compose().font('caption').foregroundStyle('secondary').monospacedDigit()}>
                {`${Math.round(book.progress * 100)}% · ${Math.round(book.pages * (1 - book.progress))} pages left`}
              </Text>
            </VStack>
          )}
        </ForEach>
      </HStack>
    </ScrollView>
  );
}

function Heading({ title, action }: { title: string; action?: string }) {
  return (
    <HStack alignment="firstTextBaseline" modifiers={compose().padding('horizontal', 20)}>
      <Text modifiers={compose().font(serif(26))}>{title}</Text>
      <Spacer />
      {action ? <Text modifiers={compose().font('subheadline').foregroundStyle(clay)}>{action}</Text> : null}
    </HStack>
  );
}

export default function Library() {
  const [fontsLoaded] = useFonts({
    GeistSerif: require('../assets/fonts/GeistSerif-Regular.ttf'),
  });
  if (!fontsLoaded) return null;

  const header = (
    <HStack modifiers={compose().padding({ top: 8, bottom: 8, leading: 20, trailing: 20 })}>
      <Text modifiers={compose().font(serif(40))}>Library</Text>
      <Spacer />
      <Button onPress={() => {}} modifiers={compose().buttonStyle('glass').buttonBorderShape('circle').controlSize('large')}>
        <Image systemName="magnifyingglass" modifiers={compose().font('title3').frame({ width: 28, height: 28 })} />
      </Button>
    </HStack>
  );

  return (
    <NavigationStack>
      <ScrollView
        modifiers={compose()
          .toolbarVisibility('hidden', { for: ['navigationBar'] })
          .safeAreaBar({ edge: 'top', content: header })}
      >
        <LazyVStack alignment="leading" spacing={16} modifiers={compose().padding({ top: 12, bottom: 32 })}>
          <Heading title="Reading now" />
          <Shelf />

          <Heading title="Up next" action="See all" />
          <VStack spacing={0} modifiers={compose().padding('horizontal', 20)}>
            <ForEach data={next} id="id">
              {(book) => (
                <VStack spacing={0}>
                  <HStack spacing={16} modifiers={compose().padding('vertical', 10)}>
                    <Cover book={book} width={48} height={72} titleSize={0} />
                    <VStack alignment="leading" spacing={3}>
                      <Text modifiers={compose().font('headline').lineLimit(1)}>{book.title}</Text>
                      <Text modifiers={compose().font('subheadline').foregroundStyle('secondary').lineLimit(1)}>{book.author}</Text>
                    </VStack>
                    <Spacer />
                    <Text modifiers={compose().font('footnote').foregroundStyle('tertiary').monospacedDigit()}>{`${book.pages} p`}</Text>
                  </HStack>
                  {book.id !== next[next.length - 1]!.id ? <Divider modifiers={compose().padding({ leading: 64 })} /> : null}
                </VStack>
              )}
            </ForEach>
          </VStack>

          <VStack alignment="leading" spacing={12} modifiers={compose()
            .padding(20)
            .frame({ maxWidth: Infinity, alignment: 'leading' })
            .background('quinary', { in: { rect: { cornerRadius: 22, style: 'continuous' } } })
            .padding('horizontal', 20)
            .padding({ top: 8 })}>
            <Text modifiers={compose().font('footnote').fontWeight('semibold').foregroundStyle('secondary')}>2026 READING GOAL</Text>
            <HStack alignment="firstTextBaseline" spacing={8}>
              <Text modifiers={compose().font(serif(56))}>14</Text>
              <Text modifiers={compose().font('title3').foregroundStyle('secondary')}>of 24 books</Text>
            </HStack>
            <ProgressView value={14 / 24} modifiers={compose().tint(clay)} />
            <Text modifiers={compose().font('footnote').foregroundStyle('secondary')}>Two books ahead of schedule</Text>
          </VStack>
        </LazyVStack>
      </ScrollView>
    </NavigationStack>
  );
}
