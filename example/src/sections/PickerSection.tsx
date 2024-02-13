import React, { useMemo } from 'react';
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
      <List.Section header="Pickers">
        <ColorPicker selection={color} label="Color" />
        <DatePicker
          selection={date}
          label="Date"
          displayedComponents={['date', 'hourAndMinute']}
        />
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
