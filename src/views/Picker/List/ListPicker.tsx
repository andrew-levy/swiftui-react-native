import React from 'react';
import { UIColor } from '../../../utils/colors/utils';
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
  background = UIColor.white,
}: ListPickerProps) => {
  return (
    <List listStyle={pickerStyle} background={background}>
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
