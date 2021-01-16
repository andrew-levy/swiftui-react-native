import React from 'react';
import { Button, Text } from 'swiftui-react-native';

export const ShortButtonExample = () => {
  return <Button text='Click me!' action={() => console.log('clicked')} />;
};

export const LongButtonExample = () => {
  return (
    <Button action={() => console.log('clicked')}>
      <Text>Click me!</Text>
    </Button>
  );
};
