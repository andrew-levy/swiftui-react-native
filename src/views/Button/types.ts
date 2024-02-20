import { StyleProp, ViewStyle } from 'react-native';
import { NativeModifiersProp, _Modifiers } from '../../utils/modifiers';

export type NativeButtonProps = {
  text: string;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  onAction?: () => void;
};

export type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  action: () => void;
  children?: string;
} & _Modifiers;
