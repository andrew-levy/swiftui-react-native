import React from 'react';
import { HStack } from './HStack';
import { Text } from './Text';
import { Image } from './Image';

type LabelProps = {
  text: string;
  icon: string;
};

export const Label: React.FC<LabelProps> = ({ text, icon }) => {
  return (
    <HStack>
      <Image name={icon} />
      <Text>{text}</Text>
    </HStack>
  );
};
