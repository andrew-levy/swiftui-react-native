import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from './Button';

type NavigationLinkProps = {
  navigation: StackNavigationProp<any, any>;
  destination: string;
  distinationProps?: object;
  label?: string;
};

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  navigation,
  destination,
  distinationProps,
  children,
  label,
}) => {
  return (
    <Button
      label={label}
      action={() => navigation.navigate(destination, distinationProps)}
    >
      {children}
    </Button>
  );
};

/* PROPS:
 * extends button props
 */
