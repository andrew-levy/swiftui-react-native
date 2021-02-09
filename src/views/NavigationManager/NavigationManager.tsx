import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

type NavigationManagerProps = {};

export const NavigationManager: React.FC<NavigationManagerProps> = ({
  children,
}) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};
