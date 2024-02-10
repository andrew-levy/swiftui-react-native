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
      <List.Section header="Colors">
        {ForEach(Object.keys(UIColors), (color, i) => (
          <HStack key={i} spacing={10}>
            <Color color={color} />
            <Text>{toWords(color)}</Text>
          </HStack>
        ))}
      </List.Section>
    </List>
  );
};

const Swatch = ({ color }: { color: UIColor }) => {
  return (
    <Color
      color={color}
      modifiers={{
        border: { width: 1, color: 'black' },
      }}
    />
  );
};
