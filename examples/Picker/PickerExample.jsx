import React, { useState } from 'react';
import { Picker } from 'swiftui-react-native';

const items = ['Option 1', 'Option 2', 'Option 2'];
export const PickerExample = () => {
  const [selected, setSelected] = useState(0);
  return <Picker items={items} selected={selected} setSelected={setSelected} />;
};
