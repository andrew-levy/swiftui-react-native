import React from 'react';
import { View } from 'react-native';
import {
  List,
  Picker,
  Section,
  Text,
  VStack,
  useBinding,
} from 'swiftui-react-native';

export const ListSection = () => {
  const listStyle = useBinding('Inset Grouped');
  return (
    <View style={{ flex: 1 }}>
      <VStack padding={20}>
        <Picker selection={listStyle} pickerStyle="segmented">
          <Text>Plain</Text>
          <Text>Grouped</Text>
          <Text>Inset Grouped</Text>
          <Text>Inset</Text>
        </Picker>
      </VStack>
      <List
        style={{ flex: 1 }}
        environment={{
          colorScheme: 'light',
        }}
        listStyle={listStyle.value.toLowerCase() as any}
      >
        <Section header="Section One" footer="This is a footer">
          <Text>Some Content</Text>
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
