import React, { useState } from 'react';
import { Picker } from 'swiftui-react-native';

export const PickerExample = () => {
  const [selected, setSelected] = useState(0);
  return (
    <Picker
      items={['Light', 'Auto', 'Dark']}
      selected={selected}
      onSelect={(newValue) => setSelected(newValue)}
    />
  );
};
