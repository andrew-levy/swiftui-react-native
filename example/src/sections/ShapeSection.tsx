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
  UnevenRoundedRectangle,
} from 'swiftui-react-native';

export const ShapeSection = () => {
  return (
    <List>
      <HStack>
        <Text>Rectangle</Text>
        <Spacer />
        <Rectangle fill="pink" />
      </HStack>
      <HStack>
        <Text>Rounded Rectangle</Text>
        <Spacer />
        <RoundedRectangle fill="blue" cornerRadius={10} />
      </HStack>
      <HStack>
        <Text>Circle</Text>
        <Spacer />
        <Circle
          fill="yellow"
          stroke={{
            color: 'orange',
            lineWidth: 5,
          }}
        />
      </HStack>
      <HStack>
        <Text>Capsule</Text>
        <Spacer />
        <Capsule fill="indigo" frame={{ width: 50, height: 30 }} />
      </HStack>
      <HStack>
        <Text>Uneven Rounded Rectangle</Text>
        <Spacer />
        <UnevenRoundedRectangle
          fill="green"
          cornerRadii={{
            topLeading: 10,
            topTrailing: 20,
            bottomLeading: 5,
            bottomTrailing: 0,
          }}
        />
      </HStack>
    </List>
  );
};
