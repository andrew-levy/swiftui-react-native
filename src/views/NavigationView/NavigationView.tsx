import React from 'react';
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/types';
import { ColorScheme } from '../ColorSchemeManager';

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
  colorScheme?: ColorScheme;
  leading?: () => React.ReactElement<any>;
  trailing?: () => React.ReactElement<any>;
  presentation: string;
} & NativeStackNavigationOptions;

export const NavigationView: React.FC<NavigationViewProps> = (props) => {
  return null;
};
