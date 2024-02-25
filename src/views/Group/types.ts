import React from 'react';
import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeGroupProps = {
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
  onEvent?: (e: NativeSyntheticEvent<{ [key: string]: any }>) => void;
};

export type GroupProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
} & Modifiers;
