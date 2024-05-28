import { ReactElement } from 'react';
import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';
import { SystemName } from '../Image/types';

export type NativeButtonProps = {
  title: string;
  systemImage: string;
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
  systemImage?: SystemName;
  role?: 'destructive' | 'cancel';
  action: () => void;
  children?: ReactElement | ReactElement[];
} & Modifiers;
