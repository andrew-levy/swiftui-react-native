import React from 'react';
import { VStack, HStack, Text, Button } from 'react-native-swiftui';

export const SpacerExample = () => {
  return (
    <VStack>
      <Text>Title</Text>
      <Spacer />
      <Text> Subtitle</Text>
      <HStack>
        <Button text='Sign In' action={() => console.log('sign in')} />
        <Spacer direction='horizontal' space={30} />
        <Button text='Sign Up' action={() => console.log('sign in')} />
      </HStack>
    </VStack>
  );
};
