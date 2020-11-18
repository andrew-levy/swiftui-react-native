import React from 'react';
import { Linking } from 'react-native';
import { Button } from './Button';

type LinkProps = {
  destination: string;
};

export const Link: React.FC<LinkProps> = ({ destination, children }) => (
  <Button action={() => Linking.openURL(destination)}>{children}</Button>
);

/* PROPS:
 * extends button
 */
