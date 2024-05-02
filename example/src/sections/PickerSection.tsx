import React, { useMemo } from 'react';
import {
  ColorPicker,
  DatePicker,
  HStack,
  List,
  Picker,
  Spacer,
  Text,
  VStack,
  useBinding,
} from 'swiftui-react-native';
const options = ['red', 'green', 'blue'];

export const PickerSection = () => {
  const today = useMemo(() => new Date(), []);
  const color = useBinding('red');
  const date = useBinding(today);
  const wheelPicker = useBinding('red');
  const menuPicker = useBinding('red');
  const segmentedPicker = useBinding('red');

  return (
    <List style={{ flex: 1 }}>
      <HStack padding={{ vertical: 10 }}>
        <ColorPicker title="Color" selection={color} />
        <Spacer />
      </HStack>
      <HStack padding={{ vertical: 10 }}>
        <DatePicker
          selection={date}
          title="Date"
          displayedComponents={['date', 'hourAndMinute']}
        />
        <Spacer />
      </HStack>
      <HStack padding={{ vertical: 10 }}>
        <VStack alignment="leading" spacing={20}>
          <Text>Segmented</Text>
          <Picker selection={segmentedPicker} pickerStyle="segmented">
            {options.map((option) => (
              <Text key={option}>{option}</Text>
            ))}
          </Picker>
        </VStack>
        <Spacer />
      </HStack>
      <HStack padding={{ vertical: 10 }}>
        <VStack alignment="leading">
          <Text>Wheel</Text>
          <Picker selection={wheelPicker} pickerStyle="wheel">
            {options.map((option) => (
              <Text key={option}>{option}</Text>
            ))}
          </Picker>
        </VStack>
        <Spacer />
      </HStack>
      <HStack padding={{ vertical: 10 }}>
        <Text>Menu</Text>
        <Spacer />
        <Picker selection={menuPicker} pickerStyle="menu">
          {options.map((option) => (
            <Text key={option}>{option}</Text>
          ))}
        </Picker>
      </HStack>
    </List>
  );
};
