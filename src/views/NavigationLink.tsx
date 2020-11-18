import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from './Button';

type NavigationLinkProps = {
  navigation: StackNavigationProp<any, any>;
  destination: string;
  distinationProps?: object;
  text: string;
};

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  navigation,
  destination,
  distinationProps,
  children,
}) => {
  return (
    <Button action={() => navigation.navigate(destination, distinationProps)}>
      {children}
    </Button>
  );
};

/* PROPS:
 * extends button props
 */
