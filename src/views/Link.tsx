import React from 'react';
import { Linking } from 'react-native';
import { Button } from './Button';

type LinkProps = {
  text: string;
  destination: string;
};

export const Link: React.FC<LinkProps> = ({ text, destination }) => (
  <Button text={text} action={() => Linking.openURL(destination)} />
);
