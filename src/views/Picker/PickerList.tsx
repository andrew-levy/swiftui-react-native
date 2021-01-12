import React from 'react';
import { Button } from '../Button';
import { HStack } from '../HStack';
import { List } from '../List';
import { Image } from '../Image';
import { Text } from '../Text';
import { PickerProps } from './Picker';
import { LIST_ICON_WIDTH } from './Constants';

export const PickerList: React.FC<PickerProps> = ({
  items,
  onSelect,
  selection,
  pickerStyle,
}) => {
  return (
    <List
      listStyle={pickerStyle === 'insetGrouped' ? 'insetGrouped' : 'grouped'}
    >
      {items.map((item, i) => (
        <Button key={i} action={() => onSelect(i)}>
          <HStack>
            <Text>{item}</Text>
            {selection === i ? (
              <Image
                name='check-mark'
                width={LIST_ICON_WIDTH}
                height={LIST_ICON_WIDTH}
              />
            ) : null}
          </HStack>
        </Button>
      ))}
    </List>
  );
};
