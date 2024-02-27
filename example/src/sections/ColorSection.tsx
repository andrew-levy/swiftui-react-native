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
          'white',
          'black',
          'cyan',
          'mint',
          'clear',
        ],
        (color, i) => (
          <HStack key={i} spacing={20} padding={{ vertical: 10 }}>
            <Color.red
              color={color}
              frame={{ width: 25, height: 25 }}
              clipShape="circle"
              shadow={{
                color: color === 'white' ? 'gray' : color,
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
