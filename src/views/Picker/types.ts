import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Binding } from '../../utils/binding';
import {
  ModifiersProp,
  NativeModifiersProp,
  _Modifiers,
} from '../../utils/modifiers';

export type NativePickerProps = {
  selection: string;
  options: any[];
  pickerStyle?: 'menu' | 'segmented' | 'wheel';
  modifiers?: NativeModifiersProp;
  onSized?: (
    e: NativeSyntheticEvent<{ value: { width: number; height: number } }>
  ) => void;
  onValueChange?: (
    e: NativeSyntheticEvent<{
      value: string;
    }>
  ) => void;
  style?: StyleProp<ViewStyle>;
};

export type PickerProps = {
  selection: Binding<string> | string;
  options: any[];
  pickerStyle?: 'menu' | 'segmented' | 'wheel';
  modifiers?: ModifiersProp;
  onValueChange?: (newValue: string) => void;
  style?: StyleProp<ViewStyle>;
} & _Modifiers;
