import React, { useState } from 'react';
import { Picker } from 'swiftui-react-native';

export const ListPickerExample = () => {
  const [selected, setSelected] = useState(0);
  return (
    <Picker
      items={['Light', 'Auto', 'Dark']}
      selection={selected}
      onSelect={(newValue) => setSelected(newValue)}
      pickerStyle='insetGrouped'
    />
  );
};

export const HorizontalPickerExample = () => {
  const [selected, setSelected] = useState(0);
  return (
    <Picker
      items={['Light', 'Auto', 'Dark']}
      selection={selected}
      onSelect={(newValue) => setSelected(newValue)}
      pickerStyle='slide'
    />
  );
};
