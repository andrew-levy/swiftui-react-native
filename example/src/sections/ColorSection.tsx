import React from 'react';
import {
  Color,
  ForEach,
  HStack,
  List,
  Spacer,
  Text,
  UIColor,
  useUIColor,
} from 'swiftui-react-native';
import { toWords } from '../utils';

export const ColorSection = () => {
  const UIColors = useUIColor();
  return (
    <List style={{ flex: 1 }}>
      {ForEach(Object.keys(UIColors), (color, i) => (
        <HStack key={i} spacing={10}>
          <Color
            color={color as UIColor}
            border={{ width: 1, color: 'systemGray4' }}
            frame={{ width: 25, height: 25 }}
          />
          <Text>{toWords(color)}</Text>
          <Spacer />
        </HStack>
      ))}
    </List>
  );
};
