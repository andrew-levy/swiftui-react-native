import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { NativeModifiersProp, _Modifiers } from '../../utils/modifiers';

export type NativeButtonProps = {
  text: string;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  onAction?: (
    e: NativeSyntheticEvent<{
      value: boolean;
    }>
  ) => void;
  onSized?: (
    e: NativeSyntheticEvent<{
      value: { width: number; height: number };
    }>
  ) => void;
};

export type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  action: () => void;
  children?: string;
} & _Modifiers;
