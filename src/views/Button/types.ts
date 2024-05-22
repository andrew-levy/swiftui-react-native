import { ReactElement } from 'react';
import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeButtonProps = {
  title: string;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  role?: string;
  onAction?: () => void;
  onEvent?: (
    e: NativeSyntheticEvent<{
      [key: string]: any;
    }>
  ) => void;
};

export type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  title?: string;
  role?: 'destructive' | 'cancel';
  action: () => void;
  children?: ReactElement | ReactElement[];
} & Modifiers;
