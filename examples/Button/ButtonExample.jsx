import React from 'react';
import { Button, Text } from 'swiftui-react-native';

export const ButtonExample1 = () => {
  return <Button label='Click me!' action={() => console.log('clicked')} />;
};

export const ButtonExample2 = () => {
  return (
    <Button action={() => console.log('clicked')}>
      <Text>Click me!</Text>
    </Button>
  );
};
