import React from 'react';
import { View } from 'react-native';
import {
  Button,
  List,
  Picker,
  Section,
  Text,
  VStack,
  useBinding,
} from 'swiftui-react-native';

export const ListSection = () => {
  const listStyle = useBinding('Inset Grouped');
  const [items, setItems] = React.useState([
    'hello',
    'world',
    'this',
    'is',
    'a',
    'list',
  ]);
  return (
    <View style={{ flex: 1 }}>
      <VStack padding={20}>
        <Picker selection={listStyle} pickerStyle="segmented">
          <Text>Plain</Text>
          <Text>Grouped</Text>
          <Text>Inset Grouped</Text>
          <Text>Inset</Text>
        </Picker>
        <Button action={() => setItems([...items, 'new item'])} title="Add" />
        <Button
          action={() => setItems(items.filter((_, index) => index !== 0))}
          title="Remove"
        />
      </VStack>
      <List
        style={{ flex: 1 }}
        environment={{
          colorScheme: 'light',
        }}
        listStyle={listStyle.value.toLowerCase() as any}
      >
        <Section header="Section One" footer="This is a footer">
          {items.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}
        </Section>
        <Section header="Section Two" footer="This is a footer">
          <Text>Some Content</Text>
        </Section>
        <Section header="Section Three" footer="This is a footer">
          <Text>Some Content</Text>
        </Section>
      </List>
    </View>
  );
};
