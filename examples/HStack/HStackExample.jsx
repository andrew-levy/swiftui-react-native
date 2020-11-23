import React from 'react';
import { Button, Text, HStack } from 'swiftui-react-native';

export const VStackExample = () => {
  return (
    <HStack background='white' cornerRadius={12} padding={12}>
      <Text>I'm on the left</Text>
      <Button
        label="I'm on the right"
        action={() => console.log('HStacks are cool')}
      />
    </HStack>
  );
};
