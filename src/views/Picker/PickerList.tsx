import React from 'react';
import { Button } from '../Button';
import { HStack } from '../HStack';
import { List } from '../List';
import { Image } from '../Image';
import { Text } from '../Text';
import { PickerProps } from '../Picker';

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
              <Image name='check-mark' width={15} height={15} />
            ) : null}
          </HStack>
        </Button>
      ))}
    </List>
  );
};
