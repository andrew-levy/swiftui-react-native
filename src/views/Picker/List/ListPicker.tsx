import React from 'react';
import { UIColor } from '../../../utils/colors';
import { Button } from '../../Button';
import { HStack } from '../../HStack';
import { List } from '../../List';
import { Spacer } from '../../Spacer';
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
          <HStack>
            <Text>{item}</Text>
            <Spacer />
            {selection === i ? <CheckMark /> : null}
          </HStack>
        </Button>
      ))}
    </List>
  );
};
