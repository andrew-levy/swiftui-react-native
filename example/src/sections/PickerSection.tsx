import React, { useMemo } from 'react';
import { Text } from 'react-native';
import {
  ColorPicker,
  DatePicker,
  List,
  Picker,
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
    <List>
      <ColorPicker selection={color} label="Color" />
      <DatePicker
        selection={date}
        label="Date"
        displayedComponents={['date', 'hourAndMinute']}
      />
      <Picker selection={segmentedPicker} pickerStyle="segmented">
        {options.map((option) => (
          <Text key={option}>{option}</Text>
        ))}
      </Picker>
      <Picker
        selection={wheelPicker}
        pickerStyle="wheel"
        frame={{ width: 300 }}
        padding
      >
        {options.map((option) => (
          <Text key={option}>{option}</Text>
        ))}
      </Picker>
      <Picker selection={menuPicker} pickerStyle="menu">
        {options.map((option) => (
          <Text key={option}>{option}</Text>
        ))}
      </Picker>
    </List>
  );
};
