import React from 'react';
import {
  Color,
  ForEach,
  HStack,
  List,
  Text,
  useUIColor,
  type UIColor,
} from 'swiftui-react-native';
import { toWords } from '../utils';

export const ColorSection = () => {
  const UIColors = useUIColor();
  return (
    <List>
      {/* <List.Section header="Colors"> */}
      {ForEach(Object.keys(UIColors), (color, i) => (
        <HStack key={i} spacing={10}>
          <Color
            color={color as UIColor}
            modifiers={{
              border: { width: 1, color: 'systemGray4' },
              frame: { width: 25, height: 25 },
            }}
          />
          <Text>{toWords(color)}</Text>
        </HStack>
      ))}
      {/* </List.Section> */}
    </List>
  );
};
