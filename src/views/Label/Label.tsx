import React from "react";
import { HStack } from "../HStack";
import { Image } from "../Image";
import { Text, TextProps } from "../Text";

type LabelProps = {
  text?: string;
  systemName?: string;
  icon?: React.ReactElement;
  children?: React.ReactElement<TextProps>;
};

export const Label = ({ text, systemName, icon }: LabelProps) => {
  return (
    <HStack>
      <Text>{text}</Text>
      {icon ? icon : <Image systemName={systemName} />}
    </HStack>
  );
};
