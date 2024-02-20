import { StyleProp, ViewStyle } from 'react-native';
import { Binding } from '../../utils/binding';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeTextFieldProps = {
  text: string;
  placeholder?: string;
  type: 'textfield' | 'securefield' | 'texteditor';
  modifiers?: NativeModifiersProp;
  onValueChange?: (e: { nativeEvent: { value: string } }) => void;
  style?: StyleProp<ViewStyle>;
};

export type TextFieldProps = {
  style?: StyleProp<ViewStyle>;
  text: string | Binding<string>;
  placeholder?: string;
  onValueChange?: (value: string) => void;
} & Modifiers;
