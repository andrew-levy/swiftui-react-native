import React from 'react';
import {
  Color,
  ForEach,
  HStack,
  List,
  Spacer,
  Text,
} from 'swiftui-react-native';
import { toWords } from '../utils';

export const ColorSection = () => {
  return (
    <List style={{ flex: 1 }}>
      {ForEach(
        [
          'blue',
          'green',
          'indigo',
          'orange',
          'pink',
          'purple',
          'red',
          'teal',
          'yellow',
          'accentColor',
          'primary',
          'secondary',
          'brown',
          'clear',
          'cyan',
          'mint',
        ],
        (color, i) => (
          <HStack key={i} spacing={20}>
            <Color.red
              color={color}
              frame={{ width: 25, height: 25 }}
              clipShape="circle"
              shadow={{
                color: color === 'clear' ? 'black' : color,
                radius: 3,
                x: 0,
                y: 1,
              }}
            />
            <Text>{toWords(color)}</Text>
            <Spacer />
          </HStack>
        )
      )}
    </List>
  );
};
