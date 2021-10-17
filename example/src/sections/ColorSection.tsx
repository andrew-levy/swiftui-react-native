import React from 'react';
import { View } from 'react-native';
import { List, ListRow, Text, useUIColor } from 'swiftui-react-native';
import { toWords } from '../utils';

export const ColorSection = () => {
  const UIColor = useUIColor();

  return (
    <>
      <List inset sideBar header='System Background + Foreground'>
        {Object.keys(UIColor)
          .filter((_, i) => i < 10)
          .map((color, i) => (
            <ListRow key={i} leading={<Swatch color={color} />}>
              <Text alignment='leading'>{toWords(color)}</Text>
            </ListRow>
          ))}
      </List>
      <List inset sideBar header='System Colors'>
        {Object.keys(UIColor)
          .filter((_, i) => i >= 10 && i < 19)
          .map((color, i) => (
            <ListRow key={i} leading={<Swatch color={color} />}>
              <Text alignment='leading'>{toWords(color)}</Text>
            </ListRow>
          ))}
      </List>
      <List inset sideBar header='System Background + Foreground'>
        {Object.keys(UIColor)
          .filter((_, i) => i >= 19)
          .map((color, i) => (
            <ListRow key={i} leading={<Swatch color={color} />}>
              <Text alignment='leading'>{toWords(color)}</Text>
            </ListRow>
          ))}
      </List>
    </>
  );
};

const Swatch = ({ color }: { color: string }) => {
  const UIColor = useUIColor();
  return (
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: UIColor.systemGray5,
        //@ts-ignore
        backgroundColor: UIColor[color],
      }}
    />
  );
};
