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
    <View style={{ flex: 1 }}>
      <HStack
        padding={20}
        border={{
          width: 1,
          color: 'systemGray4',
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
        padding={10}
        border={{ width: 1, color: 'systemGray4' }}
      >
        <Text>VStack</Text>
        <Spacer />
        <Text>VStack</Text>
        <Text>VStack</Text>
      </VStack>
      <ZStack
        style={{ marginTop: 100 }}
        padding={10}
        border={{ width: 1, color: 'systemGray4' }}
        scaleEffect={2}
      >
        <Image
          systemName="circle.fill"
          imageScale="large"
          foregroundStyle="systemPurple"
        />
        <Text>ZStack</Text>
      </ZStack>
    </View>
  );
};
