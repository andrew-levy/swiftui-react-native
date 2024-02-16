import React from 'react';
import { View } from 'react-native';
import {
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
  ZStack,
} from 'swiftui-react-native';

export const StackSection = () => {
  return (
    <View>
      <HStack
        modifiers={{
          padding: 10,
          border: { width: 1, color: 'systemGray4' },
        }}
      >
        <Text>HStack</Text>
        <Spacer />
        <Text>HStack</Text>
        <Spacer />
        <Text>HStack</Text>
      </HStack>
      <VStack
        style={{
          marginTop: 100,
          height: 200,
        }}
        modifiers={{
          padding: 10,
          border: { width: 1, color: 'systemGray4' },
        }}
      >
        <Text>VStack</Text>
        <Spacer />
        <Text>VStack</Text>
        <Text>VStack</Text>
      </VStack>
      <ZStack
        style={{ marginTop: 100 }}
        modifiers={{
          padding: 10,
          border: { width: 1, color: 'systemGray4' },
          scaleEffect: 2,
        }}
      >
        <Image
          systemName="circle.fill"
          modifiers={{
            foregroundStyle: 'red',
            imageScale: 'large',
          }}
        />
        <Text>ZStack</Text>
      </ZStack>
    </View>
  );
};
