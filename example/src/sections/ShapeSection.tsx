import React from 'react';
import {
  Capsule,
  Circle,
  HStack,
  List,
  Rectangle,
  RoundedRectangle,
  Spacer,
  Text,
} from 'swiftui-react-native';

export const ShapeSection = () => {
  return (
    <List>
      <HStack>
        <Text>Rectangle</Text>
        <Spacer />
        <Rectangle
          fill="pink"
          stroke={{
            color: 'purple',
            lineWidth: 2,
          }}
        />
      </HStack>
      <HStack>
        <Text>Rounded Rectangle</Text>
        <Spacer />
        <RoundedRectangle fill="blue" cornerRadius={10} />
      </HStack>
      <HStack>
        <Text>Circle</Text>
        <Spacer />
        <Circle />
      </HStack>
      <HStack>
        <Text>Capsule</Text>
        <Spacer />
        <Capsule frame={{ width: 50, height: 30 }} />
      </HStack>
    </List>
  );
};
