import React from 'react';
import { HStack } from './HStack';
import { Text } from './Text';

type LabelProps = {
  text: React.ReactElement | string;
  image: React.ReactElement;
};

// Ideally would work with SFSymbols
export const Label: React.FC<LabelProps> = ({ text, image }) => {
  const labelText = typeof text === 'string' ? <Text>{text}</Text> : text;
  return (
    <HStack>
      {image}
      {labelText}
    </HStack>
  );
};
