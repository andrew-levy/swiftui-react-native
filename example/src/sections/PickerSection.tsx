import React from 'react';
import { ColorPicker, List, Picker, useBinding } from 'swiftui-react-native';
const options = ['red', 'green', 'blue'];

export const PickerSection = () => {
  const color = useBinding('red');
  const wheelPicker = useBinding('red');
  const menuPicker = useBinding('red');
  const segmentedPicker = useBinding('red');

  return (
    <List>
      <List.Section header="Pickers">
        <ColorPicker selection={color} label="Color" />
        <Picker
          selection={segmentedPicker}
          options={options}
          pickerStyle="segmented"
        />
        <Picker selection={wheelPicker} options={options} pickerStyle="wheel" />
        <Picker selection={menuPicker} options={options} pickerStyle="menu" />
      </List.Section>
    </List>
  );
};
