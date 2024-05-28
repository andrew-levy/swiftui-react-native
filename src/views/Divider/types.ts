import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeDividerProps = {
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
  onEvent?: (
    e: NativeSyntheticEvent<{
      [key: string]: any;
    }>
  ) => void;
};

export type DividerProps = {
  style?: StyleProp<ViewStyle>;
} & Modifiers;
