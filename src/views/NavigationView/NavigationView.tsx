import React from 'react';
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/types';

export type NavigationViewProps = {
  name: string;
  view: React.ComponentType<any>;
  navigationBar?: NavigationBar;
};

export type NavigationBar = {
  disabled?: boolean;
  title?: string;
  displayMode?: 'inline' | 'large' | 'animated-inline' | 'animated-large';
  background?: string;
  foregroundColor?: string;
  hideShadow?: boolean;
  leading?: () => React.ReactElement<any>;
  trailing?: () => React.ReactElement<any>;
} & NativeStackNavigationOptions;

export const NavigationView: React.FC<NavigationViewProps> = (props) => {
  return null;
};
