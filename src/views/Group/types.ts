import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  ModifiersProp,
  NativeModifiersProp,
  _Modifiers,
} from '../../utils/modifiers';

export type NativeGroupProps = {
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

export type GroupProps = {
  modifiers?: ModifiersProp;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
} & _Modifiers;
