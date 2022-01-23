import React, { PropsWithChildren } from 'react';
import { Linking } from 'react-native';
import { Button } from '../Button';
import { ButtonProps } from '../Button/Button';

type LinkProps = PropsWithChildren<
  {
    destination: string;
  } & Omit<ButtonProps, 'action'>
>;

export const Link = ({ destination, children, ...props }: LinkProps) => (
  <Button action={() => openURL(destination)} {...props}>
    {children}
  </Button>
);

export const openURL = (destination: string) => Linking.openURL(destination);
