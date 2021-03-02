import React from 'react';
import { Button } from '../../Button';
import { HStack } from '../../HStack';
import { List } from '../../List';
import { Text } from '../../Text';
import { ListPickerProps } from '../Picker';
import { CheckMark } from './CheckMark';

export const ListPicker = ({
  items,
  onSelect,
  selection,
  pickerStyle,
}: ListPickerProps) => {
  return (
    <List listStyle={pickerStyle}>
      {items.map((item, i) => (
        <Button key={i} action={() => onSelect(i)}>
          <HStack spacing='stretch'>
            <Text>{item}</Text>
            {selection === i ? <CheckMark /> : null}
          </HStack>
        </Button>
      ))}
    </List>
  );
};
