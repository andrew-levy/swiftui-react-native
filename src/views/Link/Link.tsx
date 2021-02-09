import React from 'react';
import { Linking } from 'react-native';
import { Button, ButtonProps } from '../Button';

type LinkProps = {
  destination: string;
  text?: string;
  children?: React.ReactElement<any>;
} & ButtonProps;

export const Link = ({ destination, text, children, ...props }: LinkProps) => (
  <Button text={text} action={() => Linking.openURL(destination)} {...props}>
    {children}
  </Button>
);
