import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeProgressProps = {
  value?: number;
  total?: number;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
  onEvent?: (
    e: NativeSyntheticEvent<{
      [key: string]: any;
    }>
  ) => void;
};

export type ProgressProps = {
  value?: number;
  total?: number;
  style?: StyleProp<ViewStyle>;
} & Modifiers;
