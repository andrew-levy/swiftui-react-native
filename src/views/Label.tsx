import React from 'react';
import { HStack } from './HStack';
import { Text } from './Text';
import { Image } from './Image';

type LabelProps = {
  text: string;
  image: string;
};

export const Label: React.FC<LabelProps> = ({ text, image }) => {
  return (
    <HStack>
      <Image name={image} />
      <Text>{text}</Text>
    </HStack>
  );
};
