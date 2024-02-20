import { StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeTextProps = {
  text: string;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

export type TextProps = {
  style?: StyleProp<ViewStyle>;
  children?: string | string[] | number | number[];
} & Modifiers;
