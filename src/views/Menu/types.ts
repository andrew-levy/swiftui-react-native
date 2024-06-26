import { ReactNode } from 'react';
import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';
import { SystemName } from '../Image/types';

export type NativeMenuProps = {
  title: string;
  systemImage: string;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
  hasPrimaryAction?: boolean;
  children?: React.ReactNode;
  onEvent?: (
    e: NativeSyntheticEvent<{
      [key: string]: any;
    }>
  ) => void;
};

export type MenuProps = {
  style?: StyleProp<ViewStyle>;
  title?: string;
  systemImage?: SystemName;
  primaryAction?: () => void;
  children?: ReactNode;
} & Modifiers;
