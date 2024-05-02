import React from 'react';
import { View } from 'react-native';
import {
  Button,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
  ZStack,
} from 'swiftui-react-native';

export const StackSection = () => {
  return (
    <View style={{ flex: 1, padding: 50 }}>
      <HStack
        padding={20}
        cornerRadius={10}
        border={{
          width: 1,
          color: 'gray',
        }}
      >
        <Text>HStack</Text>
        <Spacer />
        <Text>HStack</Text>
        <Spacer />
        <Text>HStack</Text>
      </HStack>
      <VStack
        alignment="leading"
        spacing={20}
        frame={{ height: 200 }}
        style={{ marginTop: 100 }}
        padding={10}
        border={{ width: 1, color: 'gray' }}
      >
        <Text>VStack</Text>
        <Spacer />
        <Button title="this is a button" action={() => {}} />
        <Text>VStack</Text>
        <Text>VStack</Text>
      </VStack>
      <ZStack
        alignment="center"
        style={{ marginTop: 100 }}
        padding={10}
        border={{ width: 1, color: 'gray' }}
      >
        <Image
          systemName="circle.fill"
          imageScale="large"
          foregroundStyle="purple"
        />
        <Text>ZStack</Text>
      </ZStack>
    </View>
  );
};
