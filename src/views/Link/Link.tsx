import React from 'react';
import { Linking } from 'react-native';
import { RemoveField } from '../../utils/types';
import { Button } from '../Button';
import { ButtonProps } from '../Button/Button';

type LinkProps = RemoveField<ButtonProps, 'action'> & {
  destination: string;
};

export const Link = ({ destination, children, title, ...props }: LinkProps) => {
  if (children) {
    return (
      <Button action={() => openURL(destination)} {...props}>
        {children}
      </Button>
    );
  }

  return (
    <Button action={() => openURL(destination)} title={title} {...props} />
  );
};

export const openURL = (destination: string) => Linking.openURL(destination);
