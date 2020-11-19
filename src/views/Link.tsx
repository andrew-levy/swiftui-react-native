import React from 'react';
import { Linking } from 'react-native';
import { Button } from './Button';

type LinkProps = {
  destination: string;
  text?: string;
};

export const Link: React.FC<LinkProps> = ({ destination, text, children }) => (
  <Button text={text} action={() => Linking.openURL(destination)}>
    {children}
  </Button>
);

/* PROPS:
 * extends button
 */
