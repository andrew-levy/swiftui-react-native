import React, { useState } from 'react';
import {
  Button,
  Color,
  ColorPicker,
  DatePicker,
  Divider,
  ForEach,
  Form,
  Gauge,
  GeometryReader,
  Grid,
  GridRow,
  GroupBox,
  HStack,
  Image,
  Label,
  LabeledContent,
  LazyVGrid,
  LinearGradient,
  Link,
  List,
  Menu,
  NavigationLink,
  NavigationStack,
  Picker,
  ProgressView,
  RoundedRectangle,
  ScrollView,
  Section,
  SecureField,
  Slider,
  Spacer,
  Stepper,
  Tab,
  TabView,
  Text,
  TextEditor,
  TextField,
  Toggle,
  ToolbarItem,
  ToolbarSpacer,
  VStack,
  compose,
  useBinding,
  type SwiftUI,
} from 'swiftui-react-native';

const fruits = [
  { id: 'apple', name: 'Apple', color: 'red' },
  { id: 'kiwi', name: 'Kiwi', color: 'green' },
  { id: 'plum', name: 'Plum', color: 'purple' },
] as const;

export default function CatalogScreen() {
  const wifi = useBinding(true);
  const name = useBinding('');
  const password = useBinding('');
  const notes = useBinding('Notes');
  const volume = useBinding(0.4);
  const quantity = useBinding(2);
  const flavor = useBinding<string>('kiwi');
  const when = useBinding(new Date('2026-11-06T09:00:00Z'));
  const tint = useBinding<SwiftUI.Color>('blue');
  const selection = useBinding<string[]>([]);
  const page = useBinding<string>('home');
  const [log, setLog] = useState('Long-press a row');

  return (
    <NavigationStack>
      <Form
        modifiers={compose()
          .navigationTitle('Catalog')
          .navigationDestination({
            destination: (value: unknown) => (
              <Text>{`Detail of ${String(value)}`}</Text>
            ),
          })
          .toolbar({
            content: (
              <>
                <ToolbarItem placement="topBarLeading">
                  <Button onPress={() => setLog('Leading item')}>Edit</Button>
                </ToolbarItem>
                <ToolbarSpacer placement="topBarTrailing" />
                <ToolbarItem placement="topBarTrailing">
                  <Button
                    systemImage="plus"
                    onPress={() => setLog('Trailing item')}
                  >
                    Add
                  </Button>
                </ToolbarItem>
              </>
            ),
          })}
      >
        <Section title="Controls">
          <Toggle systemImage="wifi" isOn={wifi}>
            Wi-Fi
          </Toggle>
          <TextField text={name}>Name</TextField>
          <SecureField text={password}>Password</SecureField>
          <Slider value={volume} in={[0, 1]} />
          <Stepper
            value={quantity}
            in={[0, 10]}
          >{`Quantity ${quantity.value}`}</Stepper>
          <Picker title="Flavor" selection={flavor}>
            <ForEach data={fruits}>
              {(fruit) => (
                <Text modifiers={compose().tag(fruit.id)}>{fruit.name}</Text>
              )}
            </ForEach>
          </Picker>
          <DatePicker selection={when} displayedComponents="date">
            Date
          </DatePicker>
          <ColorPicker selection={tint}>Tint</ColorPicker>
          <TextEditor
            text={notes}
            modifiers={compose().frame({ height: 60 })}
          />
        </Section>

        <Section
          header="Content"
          footer="Footers and headers are React content too."
        >
          <Label systemImage="star.fill">Favorites</Label>
          <LabeledContent value="1.0">Version</LabeledContent>
          <Link destination="https://developer.apple.com/swiftui">SwiftUI</Link>
          <ProgressView value={volume.value} />
          <Gauge value={volume.value}>Level</Gauge>
          <GroupBox title="Group">
            <Text>Inside a group box</Text>
          </GroupBox>
          <NavigationLink value="Catalog">Push by value</NavigationLink>
        </Section>

        <Section title="contextMenu">
          <Text
            modifiers={compose().contextMenu({
              menuItems: (
                <>
                  <Button onPress={() => setLog('Copied')}>Copy</Button>
                  <Button role="destructive" onPress={() => setLog('Deleted')}>
                    Delete
                  </Button>
                </>
              ),
            })}
          >
            menuItems
          </Text>
          <Text
            modifiers={compose().contextMenu({
              menuItems: <Button onPress={() => setLog('Opened')}>Open</Button>,
              preview: (
                <VStack modifiers={compose().padding(24)}>
                  <Image
                    systemName="photo"
                    modifiers={compose().font('largeTitle')}
                  />
                  <Text>A custom preview</Text>
                </VStack>
              ),
            })}
          >
            menuItems + preview
          </Text>
          <Text>{log}</Text>
        </Section>

        <Section title="contextMenu(forSelectionType:)">
          <List
            data={fruits}
            selection={selection}
            modifiers={compose()
              .frame({ height: 180 })
              .contextMenu({
                menu: (selected: unknown[]) => (
                  <Button
                    onPress={() => setLog(`Shared ${selected.join(', ')}`)}
                  >{`Share ${selected.length} item(s)`}</Button>
                ),
                primaryAction: (selected: unknown[]) =>
                  setLog(`Opened ${selected.join(', ')}`),
              })}
          >
            {(fruit) => (
              <Text modifiers={compose().tag(fruit.id)}>{fruit.name}</Text>
            )}
          </List>
        </Section>

        <Section title="TabView">
          <TabView
            selection={page}
            modifiers={compose().frame({ height: 120 })}
          >
            <Tab title="Home" systemImage="house" value="home">
              <Text>Home page</Text>
            </Tab>
            <Tab title="Settings" systemImage="gear" value="settings">
              <Text>Settings page</Text>
            </Tab>
          </TabView>
        </Section>

        <Section title="Layout">
          <Grid horizontalSpacing={8} verticalSpacing={8}>
            <GridRow>
              <Text>Row</Text>
              <Color
                value="orange"
                modifiers={compose().frame({ height: 24 })}
              />
            </GridRow>
            <GridRow>
              <Text>Grid</Text>
              <Color
                red={0.2}
                green={0.5}
                blue={0.9}
                modifiers={compose().frame({ height: 24 })}
              />
            </GridRow>
          </Grid>
          <ScrollView axes="horizontal">
            <HStack>
              <ForEach data={[1, 2, 3, 4, 5, 6]} id="self">
                {(number) => (
                  <RoundedRectangle
                    cornerRadius={12}
                    modifiers={compose()
                      .foregroundStyle('teal')
                      .frame({ width: 80, height: 60 })
                      .overlay({ content: <Text>{number}</Text> })}
                  />
                )}
              </ForEach>
            </HStack>
          </ScrollView>
          <LazyVGrid
            columns={[
              { size: { flexible: {} } },
              { size: { adaptive: { minimum: 80 } } },
            ]}
          >
            <ForEach data={fruits}>
              {(fruit) => <Text>{fruit.name}</Text>}
            </ForEach>
          </LazyVGrid>
          <GeometryReader modifiers={compose().frame({ height: 40 })}>
            {(proxy) => <Text>{`Width: ${Math.round(proxy.size.width)}`}</Text>}
          </GeometryReader>
          <LinearGradient
            colors={['pink', 'purple']}
            startPoint="leading"
            endPoint="trailing"
            modifiers={compose().frame({ height: 24 })}
          />
          <HStack>
            <Text>Trailing</Text>
            <Spacer />
            <Divider />
            <Menu title="Menu">
              <Button onPress={() => setLog('From menu')}>Item</Button>
            </Menu>
          </HStack>
        </Section>
      </Form>
    </NavigationStack>
  );
}
