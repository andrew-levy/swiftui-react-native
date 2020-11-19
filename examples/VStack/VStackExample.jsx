import React from 'react';
import { Button, Text, VStack } from 'react-native-swiftui';

export const VStackExample = () => {
  return (
    <VStack background='white' cornerRadius={12} padding={12}>
      <Text>I'm above</Text>
      <Button
        label="I'm below"
        action={() => console.log('VStacks are cool')}
      />
    </VStack>
  );
};
