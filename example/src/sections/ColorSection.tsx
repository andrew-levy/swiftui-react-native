import React from 'react';
import {
  Color,
  ForEach,
  Label,
  List,
  UIColor,
  useUIColor,
} from 'swiftui-react-native';
import { toWords } from '../utils';

export const ColorSection = () => {
  const UIColors = useUIColor();
  return (
    <List>
      <List.Section header="Colors">
        {ForEach(Object.keys(UIColors), (color, i) => (
          <Label
            key={i}
            title={toWords(color)}
            icon={<Swatch color={color as UIColor} />}
          />
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
