import { ReactElement } from 'react';
import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Binding } from '../../utils/binding';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativePickerProps = {
  selection: string;
  options: any[];
  modifiers?: NativeModifiersProp;
  onEvent?: (
    e: NativeSyntheticEvent<{
      [key: string]: any;
    }>
  ) => void;
  style?: StyleProp<ViewStyle>;
};

export type PickerProps = {
  selection: Binding<string> | string;
  onChange?: (newValue: string) => void;
  style?: StyleProp<ViewStyle>;
  children: ReactElement | ReactElement[];
} & Modifiers;
