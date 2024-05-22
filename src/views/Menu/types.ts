import { ReactNode } from 'react';
import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeMenuProps = {
  title: string;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  onAction?: () => void;
  onEvent?: (
    e: NativeSyntheticEvent<{
      [key: string]: any;
    }>
  ) => void;
};

export type MenuProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  action: () => void;
  children?: ReactNode;
} & Modifiers;
