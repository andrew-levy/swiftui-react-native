import React from 'react';
import { Linking } from 'react-native';
import { Button } from './Button';

type LinkProps = {
  destination: string;
  text?: string;
  children?: React.ReactElement<any>;
};

export const Link = ({ destination, text, children }: LinkProps) => (
  <Button text={text} action={() => Linking.openURL(destination)}>
    {children}
  </Button>
);

/* PROPS:
 * extends button
 */
