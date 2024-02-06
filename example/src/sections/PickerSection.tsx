import React from 'react';
import { ColorPicker, List, useBinding } from 'swiftui-react-native';

export const PickerSection = () => {
  const color = useBinding('red');
  console.log('color', color);
  return (
    <List>
      <ColorPicker
        selection={color}
        label="Color"
        modifiers={
          (content) => content
          // .background('red')
          // .border({ color: 'black', width: 1 })
          // .padding(10)
          // .border({ color: 'accentColor', width: 1 })
          // .border({ color: 'black', width: 1 })
          // .bold()
        }
      />
    </List>
  );
};
