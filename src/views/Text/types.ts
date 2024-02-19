import { StyleProp, ViewStyle } from 'react-native';
import { NativeModifiersProp, _Modifiers } from '../../utils/modifiers';

export type NativeTextProps = {
  text: string;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

export type TextProps = {
  style?: StyleProp<ViewStyle>;
  children?: string;
} & _Modifiers;
