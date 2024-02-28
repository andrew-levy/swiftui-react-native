import React from 'react';
import { View } from 'react-native';
import { List, Picker, Text, VStack, useBinding } from 'swiftui-react-native';

export default function Page() {
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
        data={['One', 'Two', 'Three']}
        style={{ flex: 1 }}
        environment={{
          colorScheme: 'light',
        }}
        listStyle={listStyle.value.toLowerCase() as any}
        header="Inset Grouped List"
      >
        {(item) => <Text>{item}</Text>}
      </List>
    </View>
  );
}
