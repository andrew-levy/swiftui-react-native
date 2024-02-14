import React from 'react';
import {
  Capsule,
  Circle,
  HStack,
  List,
  Rectangle,
  RoundedRectangle,
  Text,
} from 'swiftui-react-native';

export const ShapeSection = () => {
  return (
    <List>
      {/* <List.Section header="Shapes"> */}
      <HStack>
        <Text>Rectangle</Text>
        {/* <Spacer /> */}
        <Rectangle />
      </HStack>
      <HStack>
        <Text>Rounded Rectangle</Text>
        {/* <Spacer /> */}
        <RoundedRectangle cornerRadius={10} />
      </HStack>
      <HStack>
        <Text>Circle</Text>
        {/* <Spacer /> */}
        <Circle />
      </HStack>
      <HStack>
        <Text>Capsule</Text>
        {/* <Spacer /> */}
        <Capsule
          modifiers={{
            frame: { width: 50, height: 30 },
          }}
        />
      </HStack>
      {/* </List.Section> */}
    </List>
  );
};