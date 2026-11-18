import { useFonts } from 'expo-font';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  ForEach,
  Form,
  HStack,
  Image,
  NavigationStack,
  Picker,
  Section,
  Spacer,
  Stepper,
  SwiftUI,
  Text,
  ToolbarItem,
  VStack,
  compose,
  useBinding,
  withAnimation,
} from 'swiftui-react-native';

const hsb = (hue: number, saturation: number, brightness: number): SwiftUI.Color => ({ hue, saturation, brightness });
const serif = (size: number): SwiftUI.Font => ({ custom: { name: 'GeistSerif', size } });
const clay = hsb(0.04, 0.54, 0.78);

type Recipe = { id: string; name: string; minutes: number; note: string };

const recipes: Recipe[] = [
  { id: 'shakshuka', name: 'Shakshuka', minutes: 35, note: 'Eggs poached in spiced tomato' },
  { id: 'risotto', name: 'Lemon risotto', minutes: 40, note: 'Parmesan, thyme, a lot of stirring' },
  { id: 'dal', name: 'Weeknight dal', minutes: 25, note: 'Red lentils, ginger, cumin' },
  { id: 'focaccia', name: 'Rosemary focaccia', minutes: 90, note: 'Dimpled, olive oil, flaky salt' },
  { id: 'soup', name: 'Roast squash soup', minutes: 50, note: 'Sage brown butter on top' },
];

const ingredients = [
  { id: 'tomato', amount: 400, unit: 'g', name: 'crushed tomatoes' },
  { id: 'egg', amount: 6, unit: '', name: 'eggs' },
  { id: 'pepper', amount: 2, unit: '', name: 'red peppers, sliced' },
  { id: 'onion', amount: 1, unit: '', name: 'onion, diced' },
  { id: 'cumin', amount: 1.5, unit: 'tsp', name: 'ground cumin' },
  { id: 'feta', amount: 120, unit: 'g', name: 'feta, crumbled' },
];

const steps = [
  'Soften the onion and peppers in olive oil until sweet, about ten minutes.',
  'Stir in the cumin and paprika, then the tomatoes. Simmer until thick.',
  'Make wells, crack in the eggs, cover and cook until the whites set.',
];

const scaled = (amount: number, unit: string, scale: number) => {
  const value = amount * scale;
  if (unit === 'g') return Math.max(10, Math.round(value / 10) * 10);
  if (unit === '') return Math.max(1, Math.round(value));
  return Math.max(0.5, Math.round(value * 2) / 2);
};

function Fact({ symbol, value, label }: { symbol: string; value: string; label: string }) {
  return (
    <VStack spacing={6} modifiers={compose().frame({ maxWidth: Infinity })}>
      <Image systemName={symbol} modifiers={compose().font('body').foregroundStyle(clay)} />
      <Text modifiers={compose().font('headline').monospacedDigit()}>{value}</Text>
      <Text modifiers={compose().font('caption').foregroundStyle('secondary')}>{label}</Text>
    </VStack>
  );
}

function Detail({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  const servings = useBinding(4);
  const [checked, setChecked] = useState<string[]>(['tomato', 'onion']);
  const scale = servings.value / 4;
  const toggle = (id: string) =>
    withAnimation('snappy', () =>
      setChecked((list) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id]))
    );

  return (
    <NavigationStack modifiers={compose().tint(clay).presentationDetents(['large'])}>
      <Form
        modifiers={compose()
          .navigationTitle('')
          .navigationBarTitleDisplayMode('inline')
          .toolbar({
            content: (
              <>
                <ToolbarItem placement="cancellationAction">
                  <Button systemImage="xmark" onPress={onClose}>
                    Close
                  </Button>
                </ToolbarItem>
                <ToolbarItem placement="primaryAction">
                  <Button systemImage="heart" onPress={() => {}}>
                    Save
                  </Button>
                </ToolbarItem>
              </>
            ),
          })
          .safeAreaInset({
            edge: 'bottom',
            content: (
              <Button
                onPress={() => {}}
                modifiers={compose()
                  .buttonStyle('glassProminent')
                  .controlSize('large')
                  .padding('horizontal', 20)
                  .padding({ bottom: 4 })}
              >
                <Text modifiers={compose().font('headline').frame({ maxWidth: Infinity })}>Start cooking</Text>
              </Button>
            ),
          })}
      >
        <Section>
          <VStack alignment="leading" spacing={6} modifiers={compose().padding({ top: 4, bottom: 8 })}>
            <Text modifiers={compose().font(serif(40))}>{recipe.name}</Text>
            <Text modifiers={compose().font('subheadline').foregroundStyle('secondary')}>{recipe.note}</Text>
          </VStack>
          <HStack modifiers={compose().padding('vertical', 6)}>
            <Fact symbol="clock" value={`${recipe.minutes} min`} label="Total" />
            <Divider />
            <Fact symbol="flame" value="Medium" label="Heat" />
            <Divider />
            <Fact symbol="leaf" value="Veg" label="Diet" />
          </HStack>
        </Section>

        <Section title="Ingredients">
          <Stepper value={servings} in={[1, 12]}>
            <HStack spacing={6}>
              <Text>Serves</Text>
              <Text modifiers={compose().fontWeight('semibold').contentTransition({ numericText: { value: servings.value } })}>
                {`${servings.value}`}
              </Text>
            </HStack>
          </Stepper>
          <ForEach data={ingredients} id="id">
            {(item) => {
              const done = checked.includes(item.id);
              return (
                <Button onPress={() => toggle(item.id)} modifiers={compose().buttonStyle('plain')}>
                  <HStack spacing={14}>
                    <Image
                      systemName={done ? 'checkmark.circle.fill' : 'circle'}
                      modifiers={compose()
                        .font('title3')
                        .foregroundStyle(done ? clay : 'tertiary')
                        .contentTransition('symbolEffect')}
                    />
                    <Text
                      modifiers={compose()
                        .fontWeight('semibold')
                        .monospacedDigit()
                        .foregroundStyle(done ? 'secondary' : 'primary')
                        .contentTransition({ numericText: { value: scaled(item.amount, item.unit, scale) } })
                        .frame({ width: 64, alignment: 'leading' })}
                    >
                      {`${scaled(item.amount, item.unit, scale)}${item.unit ? ` ${item.unit}` : ''}`}
                    </Text>
                    <Text modifiers={compose().foregroundStyle(done ? 'secondary' : 'primary').strikethrough(done)}>{item.name}</Text>
                    <Spacer />
                  </HStack>
                </Button>
              );
            }}
          </ForEach>
        </Section>

        <Section title="Method">
          <ForEach data={steps.map((text, index) => ({ id: index, text }))} id="id">
            {(step) => (
              <HStack alignment="firstTextBaseline" spacing={14} modifiers={compose().padding('vertical', 4)}>
                <Text modifiers={compose().font(serif(26)).foregroundStyle(clay).frame({ width: 22 })}>{`${step.id + 1}`}</Text>
                <Text modifiers={compose().foregroundStyle('primary')}>{step.text}</Text>
              </HStack>
            )}
          </ForEach>
        </Section>
      </Form>
    </NavigationStack>
  );
}

export default function Recipes() {
  const params = useLocalSearchParams<{ open?: string }>();
  const filter = useBinding<string>('all');
  const [selectedId, setSelectedId] = useState(params.open ?? recipes[0]!.id);
  const isPresented = useBinding(Boolean(params.open));
  useEffect(() => {
    if (!params.open) return;
    setSelectedId(params.open);
    isPresented.setValue(true);
  }, [params.open]);
  const [fontsLoaded] = useFonts({
    GeistSerif: require('../assets/fonts/GeistSerif-Regular.ttf'),
  });
  if (!fontsLoaded) return null;

  const selected = recipes.find((recipe) => recipe.id === selectedId) ?? recipes[0]!;
  const visible = recipes.filter((recipe) => filter.value === 'all' || recipe.minutes <= 40);

  const header = (
    <HStack modifiers={compose().padding({ top: 8, bottom: 8, leading: 20, trailing: 20 })}>
      <Text modifiers={compose().font(serif(40))}>Recipes</Text>
      <Spacer />
      <Button onPress={() => {}} modifiers={compose().buttonStyle('glass').buttonBorderShape('circle').controlSize('large')}>
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
          .safeAreaBar({ edge: 'top', content: header })
          .sheet({
            isPresented,
            content: <Detail recipe={selected} onClose={() => isPresented.setValue(false)} />,
          })}
      >
        <Section>
          <Picker title="Filter" selection={filter} modifiers={compose().pickerStyle('segmented')}>
            <Text modifiers={compose().tag('all')}>All</Text>
            <Text modifiers={compose().tag('quick')}>Under 40 min</Text>
          </Picker>
        </Section>
        <Section title="This week">
          <ForEach data={visible} id="id">
            {(recipe) => (
              <Button
                onPress={() => {
                  setSelectedId(recipe.id);
                  isPresented.setValue(true);
                }}
                modifiers={compose().buttonStyle('plain')}
              >
                <HStack>
                  <VStack alignment="leading" spacing={3}>
                    <Text modifiers={compose().font(serif(22))}>{recipe.name}</Text>
                    <Text modifiers={compose().font('subheadline').foregroundStyle('secondary').lineLimit(1)}>{recipe.note}</Text>
                  </VStack>
                  <Spacer />
                  <Text modifiers={compose().font('footnote').foregroundStyle('secondary').monospacedDigit()}>{`${recipe.minutes} min`}</Text>
                  <Image systemName="chevron.right" modifiers={compose().font('footnote').fontWeight('semibold').foregroundStyle('tertiary')} />
                </HStack>
              </Button>
            )}
          </ForEach>
        </Section>
      </Form>
    </NavigationStack>
  );
}
