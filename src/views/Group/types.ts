import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeGroupProps = {
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

export type GroupProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
} & Modifiers;
