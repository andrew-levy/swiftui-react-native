import { ReactElement } from 'react';
import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeHStackProps = {
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  spacing?: number;
  alignment?: string;
  onEvent?: (e: NativeSyntheticEvent<{ [key: string]: any }>) => void;
  style?: StyleProp<ViewStyle>;
};

export type HStackProps = {
  spacing?: number;
  alignment?: 'top' | 'center' | 'bottom';
  style?: StyleProp<ViewStyle>;
  children?: ReactElement | ReactElement[];
} & Modifiers;
