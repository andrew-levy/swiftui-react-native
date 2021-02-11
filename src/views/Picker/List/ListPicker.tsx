import React from 'react';
import { Button } from '../../Button';
import { HStack } from '../../HStack';
import { List } from '../../List';
import { Image } from '../../Image';
import { Text } from '../../Text';
import { PickerProps } from '../Picker';
import { LIST_ICON_WIDTH } from '../Constants';

export type ListPickerProps = PickerProps & {
  pickerStyle: 'insetGrouped' | 'grouped';
};

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
            {selection === i ? (
              <Image
                name='check-mark'
                frame={{ width: LIST_ICON_WIDTH, height: LIST_ICON_WIDTH }}
              />
            ) : null}
          </HStack>
        </Button>
      ))}
    </List>
  );
};
