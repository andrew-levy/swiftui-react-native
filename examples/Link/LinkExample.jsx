import React from 'react';
import { Link, Text } from 'swiftui-react-native';

export const ShortLinkExample = () => {
  <Link text='Go to Google' destination='https://google.com' />;
};

export const LongLinkExample = () => {
  return (
    <Link destination='https://google.com'>
      <Text>Go to Google</Text>
    </Link>
  );
};
