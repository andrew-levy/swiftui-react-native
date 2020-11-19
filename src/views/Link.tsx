import React from 'react';
import { Linking } from 'react-native';
import { Button } from './Button';

type LinkProps = {
  destination: string;
  label?: string;
};

export const Link: React.FC<LinkProps> = ({ destination, label, children }) => (
  <Button label={label} action={() => Linking.openURL(destination)}>
    {children}
  </Button>
);

/* PROPS:
 * extends button
 */
