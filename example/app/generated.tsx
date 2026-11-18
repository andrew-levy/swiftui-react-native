import { useFonts } from 'expo-font';
import { useState } from 'react';
import {
  Button,
  ForEach,
  Form,
  HStack,
  Image,
  LabeledContent,
  LazyVGrid,
  NavigationStack,
  Picker,
  RoundedRectangle,
  ScrollView,
  Section,
  Slider,
  Spacer,
  SwiftUI,
  Text,
  TextField,
  Toggle,
  ToolbarItem,
  VStack,
  compose,
  useBinding,
  withAnimation,
  type Binding,
} from 'swiftui-react-native';

type Corners = 'soft' | 'round' | 'sharp';

type Swatch = {
  id: string;
  name: string;
  hue: number;
  saturation: number;
  brightness: number;
  corners: Corners;
  favorite: boolean;
};

const NAMESPACE = 'palette';
const serif = <T extends number>(size: T): SwiftUI.Font => ({
  custom: { name: 'GeistSerif', size },
});
const radius: Record<Corners, number> = { soft: 24, round: 90, sharp: 4 };

const colorOf = ({ hue, saturation, brightness }: Swatch): SwiftUI.Color => ({
  hue,
  saturation,
  brightness,
});

function hexOf({ hue, saturation, brightness }: Swatch) {
  const channel = (n: number) => {
    const k = (n + hue * 6) % 6;
    const value =
      brightness - brightness * saturation * Math.max(0, Math.min(k, 4 - k, 1));
    return Math.round(value * 255)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${channel(5)}${channel(3)}${channel(1)}`.toUpperCase();
}

const initial: Swatch[] = [
  {
    id: 'clay',
    name: 'Clay',
    hue: 0.04,
    saturation: 0.54,
    brightness: 0.78,
    corners: 'soft',
    favorite: true,
  },
  {
    id: 'sage',
    name: 'Sage',
    hue: 0.28,
    saturation: 0.16,
    brightness: 0.67,
    corners: 'soft',
    favorite: false,
  },
  {
    id: 'sand',
    name: 'Sand',
    hue: 0.1,
    saturation: 0.23,
    brightness: 0.88,
    corners: 'soft',
    favorite: false,
  },
  {
    id: 'ink',
    name: 'Ink',
    hue: 0.6,
    saturation: 0.41,
    brightness: 0.27,
    corners: 'soft',
    favorite: false,
  },
  {
    id: 'rose',
    name: 'Rose',
    hue: 0.0,
    saturation: 0.27,
    brightness: 0.85,
    corners: 'soft',
    favorite: false,
  },
  {
    id: 'moss',
    name: 'Moss',
    hue: 0.27,
    saturation: 0.29,
    brightness: 0.42,
    corners: 'soft',
    favorite: false,
  },
];

const blank: Omit<Swatch, 'id'> = {
  name: '',
  hue: 0.58,
  saturation: 0.3,
  brightness: 0.75,
  corners: 'soft',
  favorite: false,
};

function field<K extends keyof Swatch>(
  swatch: Swatch,
  key: K,
  onChange: (patch: Partial<Swatch>) => void
): Binding<Swatch[K]> {
  return {
    value: swatch[key],
    setValue: (next) =>
      onChange({
        [key]:
          typeof next === 'function'
            ? (next as (old: Swatch[K]) => Swatch[K])(swatch[key])
            : next,
      }),
  };
}

function Tile({
  swatch,
  onOpen,
  onDelete,
}: {
  swatch: Swatch;
  onOpen: () => void;
  onDelete: () => void;
}) {
  return (
    <VStack alignment="leading" spacing={8}>
      <RoundedRectangle
        cornerRadius={radius[swatch.corners]}
        modifiers={compose()
          .foregroundStyle(colorOf(swatch))
          .frame({ height: 200 })
          .overlay({
            alignment: 'topTrailing',
            content: (
              <Image
                systemName={swatch.favorite ? 'heart.fill' : 'heart'}
                modifiers={compose()
                  .foregroundStyle('white')
                  .opacity(swatch.favorite ? 1 : 0)
                  .symbolEffect('bounce', { value: swatch.favorite })
                  .padding(16)}
              />
            ),
          })
          .matchedTransitionSource({ id: swatch.id, in: NAMESPACE })
          .onTapGesture({ perform: onOpen })
          .contextMenu({
            menuItems: (
              <>
                <Button
                  systemImage="arrow.up.left.and.arrow.down.right"
                  onPress={onOpen}
                >
                  Open
                </Button>
                <Button
                  systemImage="trash"
                  role="destructive"
                  onPress={onDelete}
                >
                  Delete
                </Button>
              </>
            ),
            preview: (
              <RoundedRectangle
                cornerRadius={0}
                modifiers={compose()
                  .foregroundStyle(colorOf(swatch))
                  .frame({ width: 300, height: 400 })
                  .overlay({
                    alignment: 'bottomLeading',
                    content: (
                      <Text
                        modifiers={compose()
                          .font(serif(34))
                          .foregroundStyle('white')
                          .padding(24)}
                      >
                        {swatch.name}
                      </Text>
                    ),
                  })}
              />
            ),
          })}
      />
      <Text modifiers={compose().font(serif(20))}>{swatch.name}</Text>
    </VStack>
  );
}

function Preview({ swatch }: { swatch: Swatch }) {
  return (
    <Section>
      <RoundedRectangle
        cornerRadius={0}
        modifiers={compose()
          .foregroundStyle(colorOf(swatch))
          .frame({ height: 180 })
          .overlay({
            alignment: 'bottomLeading',
            content: (
              <VStack
                alignment="leading"
                spacing={2}
                modifiers={compose().padding(20)}
              >
                <Text modifiers={compose().font(serif(36))}>
                  {swatch.name || 'Untitled'}
                </Text>
                <Text
                  modifiers={compose()
                    .font('subheadline')
                    .fontDesign('monospaced')
                    .opacity(0.8)}
                >
                  {hexOf(swatch)}
                </Text>
              </VStack>
            ),
          })
          .foregroundStyle(
            swatch.brightness > 0.6 && swatch.saturation < 0.5
              ? 'black'
              : 'white'
          )
          .listRowInsets({ top: 0, leading: 0, bottom: 0, trailing: 0 })}
      />
    </Section>
  );
}

function Channel({
  title,
  value,
  display,
}: {
  title: string;
  value: Binding<number>;
  display: string;
}) {
  return (
    <VStack alignment="leading" spacing={6}>
      <HStack>
        <Text>{title}</Text>
        <Spacer />
        <Text
          modifiers={compose()
            .monospacedDigit()
            .foregroundStyle('secondary')
            .contentTransition({ numericText: { value: value.value } })}
        >
          {display}
        </Text>
      </HStack>
      <Slider value={value} in={[0, 1]} />
    </VStack>
  );
}

function Editor({
  swatch,
  onChange,
}: {
  swatch: Swatch;
  onChange: (patch: Partial<Swatch>) => void;
}) {
  const hue = field(swatch, 'hue', onChange);
  const saturation = field(swatch, 'saturation', onChange);
  const brightness = field(swatch, 'brightness', onChange);

  return (
    <>
      <Section title="Color">
        <Channel
          title="Hue"
          value={hue}
          display={`${Math.round(hue.value * 360)}°`}
        />
        <Channel
          title="Saturation"
          value={saturation}
          display={`${Math.round(saturation.value * 100)}%`}
        />
        <Channel
          title="Brightness"
          value={brightness}
          display={`${Math.round(brightness.value * 100)}%`}
        />
      </Section>
      <Section title="Style">
        <Picker
          title="Corners"
          selection={field(swatch, 'corners', (patch) =>
            withAnimation('bouncy', () => onChange(patch))
          )}
          modifiers={compose().pickerStyle('segmented')}
        >
          <Text modifiers={compose().tag('soft')}>Soft</Text>
          <Text modifiers={compose().tag('round')}>Round</Text>
          <Text modifiers={compose().tag('sharp')}>Sharp</Text>
        </Picker>
        <Toggle systemImage="heart" isOn={field(swatch, 'favorite', onChange)}>
          Favorite
        </Toggle>
      </Section>
    </>
  );
}

function Detail({
  swatch,
  onChange,
  onClose,
  onDelete,
}: {
  swatch: Swatch;
  onChange: (patch: Partial<Swatch>) => void;
  onClose: () => void;
  onDelete: () => void;
}) {
  return (
    <NavigationStack
      modifiers={compose()
        .tint(colorOf(swatch))
        .navigationTransition(
          SwiftUI.NavigationTransition.zoom({
            sourceID: swatch.id,
            in: NAMESPACE,
          })
        )
        .presentationDetents(['medium', 'large'])}
    >
      <Form
        modifiers={compose()
          .navigationTitle(swatch.name)
          .navigationBarTitleDisplayMode('inline')
          .toolbar({
            content: (
              <ToolbarItem placement="confirmationAction">
                <Button systemImage="checkmark" onPress={onClose}>
                  Done
                </Button>
              </ToolbarItem>
            ),
          })}
      >
        <Preview swatch={swatch} />
        <Editor swatch={swatch} onChange={onChange} />
        <Section title="Details">
          <LabeledContent value={hexOf(swatch)}>Hex</LabeledContent>
          <LabeledContent
            value={`${Math.round(swatch.hue * 360)}°  ${Math.round(swatch.saturation * 100)}%  ${Math.round(swatch.brightness * 100)}%`}
          >
            HSB
          </LabeledContent>
        </Section>
        <Section>
          <Button role="destructive" onPress={onDelete}>
            Delete Swatch
          </Button>
        </Section>
      </Form>
    </NavigationStack>
  );
}

function NewSwatch({
  onAdd,
  onCancel,
}: {
  onAdd: (swatch: Swatch) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<Swatch>({ ...blank, id: 'draft' });
  const update = (patch: Partial<Swatch>) =>
    setDraft((current) => ({ ...current, ...patch }));

  return (
    <NavigationStack
      modifiers={compose()
        .tint(colorOf(draft))
        .navigationTransition(
          SwiftUI.NavigationTransition.zoom({ sourceID: 'new', in: NAMESPACE })
        )}
    >
      <Form
        modifiers={compose()
          .navigationTitle('New Swatch')
          .navigationBarTitleDisplayMode('inline')
          .toolbar({
            content: (
              <>
                <ToolbarItem placement="cancellationAction">
                  <Button systemImage="xmark" onPress={onCancel}>
                    Cancel
                  </Button>
                </ToolbarItem>
                <ToolbarItem placement="confirmationAction">
                  <Button
                    systemImage="checkmark"
                    onPress={() =>
                      onAdd({
                        ...draft,
                        id: `${Date.now()}`,
                        name: draft.name || 'Untitled',
                      })
                    }
                  >
                    Add
                  </Button>
                </ToolbarItem>
              </>
            ),
          })}
      >
        <Preview swatch={draft} />
        <Section title="Name">
          <TextField text={field(draft, 'name', update)}>Untitled</TextField>
        </Section>
        <Editor swatch={draft} onChange={update} />
      </Form>
    </NavigationStack>
  );
}

export default function Generated() {
  const [swatches, setSwatches] = useState(initial);
  const [selectedId, setSelectedId] = useState(initial[0]!.id);
  const isDetailPresented = useBinding(false);
  const isNewPresented = useBinding(false);
  const [fontsLoaded] = useFonts({
    GeistSerif: require('../assets/fonts/GeistSerif-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  const selected =
    swatches.find((swatch) => swatch.id === selectedId) ?? swatches[0];

  const open = (swatch: Swatch) => {
    setSelectedId(swatch.id);
    isDetailPresented.setValue(true);
  };
  const update = (id: string, patch: Partial<Swatch>) =>
    setSwatches((list) =>
      list.map((swatch) =>
        swatch.id === id ? { ...swatch, ...patch } : swatch
      )
    );
  const remove = (id: string) => {
    isDetailPresented.setValue(false);
    withAnimation('smooth', () =>
      setSwatches((list) => list.filter((swatch) => swatch.id !== id))
    );
  };
  const add = (swatch: Swatch) => {
    isNewPresented.setValue(false);
    withAnimation('smooth', () => setSwatches((list) => [swatch, ...list]));
  };

  const header = (
    <HStack
      modifiers={compose().padding({
        top: 8,
        bottom: 8,
        leading: 20,
        trailing: 20,
      })}
    >
      <Text modifiers={compose().font(serif(40))}>Palette</Text>
      <Spacer />
      <Button
        onPress={() => isNewPresented.setValue(true)}
        modifiers={compose()
          .buttonStyle('glass')
          .buttonBorderShape('circle')
          .controlSize('large')
          .popover({
            isPresented: isNewPresented,
            content: (
              <NewSwatch
                onAdd={add}
                onCancel={() => isNewPresented.setValue(false)}
              />
            ),
          })}
      >
        <Image
          systemName="plus"
          modifiers={compose()
            .font('title3')
            .frame({ width: 28, height: 28 })
            .matchedTransitionSource({ id: 'new', in: NAMESPACE })}
        />
      </Button>
    </HStack>
  );

  return (
    <NavigationStack>
      <ScrollView
        modifiers={compose()
          .toolbarVisibility('hidden', { for: ['navigationBar'] })

          .safeAreaBar({ edge: 'top', content: header })
          .sheet({
            isPresented: isDetailPresented,
            content: selected && (
              <Detail
                swatch={selected}
                onChange={(patch) => update(selected.id, patch)}
                onClose={() => isDetailPresented.setValue(false)}
                onDelete={() => remove(selected.id)}
              />
            ),
          })}
      >
        <VStack
          alignment="leading"
          spacing={24}
          modifiers={compose().padding(20)}
        >
          <LazyVGrid
            spacing={20}
            columns={[
              { size: { flexible: {} }, spacing: 16 },
              { size: { flexible: {} } },
            ]}
          >
            <ForEach data={swatches} id="id">
              {(swatch) => (
                <Tile
                  swatch={swatch}
                  onOpen={() => open(swatch)}
                  onDelete={() => remove(swatch.id)}
                />
              )}
            </ForEach>
          </LazyVGrid>
        </VStack>
      </ScrollView>
    </NavigationStack>
  );
}
