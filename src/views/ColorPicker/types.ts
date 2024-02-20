import { StyleProp, ViewStyle } from 'react-native';
import { Binding } from '../../utils/binding';
import {
  Modifiers,
  ModifiersProp,
  NativeModifiersProp,
} from '../../utils/modifiers';

export type NativeColorPickerProps = {
  selection: string;
  onValueChange?: (e: {
    nativeEvent: {
      value: string;
    };
  }) => void;
  modifiers?: NativeModifiersProp;
  label?: string;
  supportsOpacity?: boolean;
  style?: StyleProp<ViewStyle>;
};

export type ColorPickerProps = {
  selection: string | Binding<string>;
  onChange?: (color: string) => void;
  modifiers?: ModifiersProp;
  label?: string;
  supportsOpacity?: boolean;
  style?: StyleProp<ViewStyle>;
} & Modifiers;
