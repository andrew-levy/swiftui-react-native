import { ReactElement } from 'react';
import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Binding } from '../../utils/binding';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativePickerProps = {
  selection: string;
  options: any[];
  pickerStyle?: 'menu' | 'segmented' | 'wheel';
  modifiers?: NativeModifiersProp;
  onValueChange?: (
    e: NativeSyntheticEvent<{
      value: string;
    }>
  ) => void;
  style?: StyleProp<ViewStyle>;
};

export type PickerProps = {
  selection: Binding<string> | string;
  pickerStyle?: 'menu' | 'segmented' | 'wheel';
  onValueChange?: (newValue: string) => void;
  style?: StyleProp<ViewStyle>;
  children: ReactElement | ReactElement[];
} & Modifiers;
