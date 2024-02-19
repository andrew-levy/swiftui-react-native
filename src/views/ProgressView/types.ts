import { StyleProp, ViewStyle } from 'react-native';
import { NativeModifiersProp, _Modifiers } from '../../utils/modifiers';

export type NativeProgressProps = {
  value?: number;
  total?: number;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

export type ProgressProps = {
  value?: number;
  total?: number;
  style?: StyleProp<ViewStyle>;
} & _Modifiers;
