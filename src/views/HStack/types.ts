import { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  ModifiersProp,
  NativeModifiersProp,
  _Modifiers,
} from '../../utils/modifiers';

export type NativeHStackProps = {
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  spacing?: number;
  alignment?: string;
  style?: StyleProp<ViewStyle>;
};

export type HStackProps = {
  modifiers?: ModifiersProp;
  spacing?: number;
  alignment?: 'leading' | 'center' | 'trailing';
  style?: StyleProp<ViewStyle>;
  children?: ReactElement | ReactElement[];
} & _Modifiers;
