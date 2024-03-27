import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Binding } from '../../utils/binding';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeColorPickerProps = {
  selection: string;
  modifiers?: NativeModifiersProp;
  title?: string;
  supportsOpacity?: boolean;
  style?: StyleProp<ViewStyle>;
  onEvent?: (e: NativeSyntheticEvent<{ [key: string]: any }>) => void;
};

export type ColorPickerProps = {
  selection: string | Binding<string>;
  onChange?: (color: string) => void;
  title?: string;
  supportsOpacity?: boolean;
  style?: StyleProp<ViewStyle>;
} & Modifiers;
