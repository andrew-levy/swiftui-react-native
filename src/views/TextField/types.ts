import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Binding } from '../../utils/binding';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeTextFieldProps = {
  text: string;
  placeholder?: string;
  type: 'textfield' | 'securefield' | 'texteditor';
  modifiers?: NativeModifiersProp;
  onEvent?: (
    e: NativeSyntheticEvent<{
      [key: string]: any;
    }>
  ) => void;
  style?: StyleProp<ViewStyle>;
};

export type TextFieldProps = {
  style?: StyleProp<ViewStyle>;
  text: string | Binding<string>;
  placeholder?: string;
  onChange?: (value: string) => void;
} & Modifiers;
