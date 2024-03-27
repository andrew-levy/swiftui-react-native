import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeTextProps = {
  text: string;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
  onEvent?: (
    e: NativeSyntheticEvent<{
      [key: string]: any;
    }>
  ) => void;
};

export type TextProps = {
  style?: StyleProp<ViewStyle>;
  children?: string | string[] | number | number[] | (string | number)[];
} & Modifiers;
