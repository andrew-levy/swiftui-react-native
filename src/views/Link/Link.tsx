import React, { PropsWithChildren } from 'react';
import { Linking } from 'react-native';
import { Button, ButtonProps } from '../Button';

type LinkProps = PropsWithChildren<
  {
    destination: string;
  } & ButtonProps
>;

export const Link = ({ destination, children, ...props }: LinkProps) => (
  <Button action={() => Linking.openURL(destination)} {...props}>
    {children}
  </Button>
);
