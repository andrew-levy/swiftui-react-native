import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

type NavigationContainerProps = {};

export const NavigationView: React.FC<NavigationContainerProps> = ({
  children,
}) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};
