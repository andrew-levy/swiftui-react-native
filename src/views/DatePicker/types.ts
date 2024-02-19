import { StyleProp, ViewStyle } from 'react-native';
import { Binding } from '../../utils/binding';
import {
  ModifiersProp,
  NativeModifiersProp,
  _Modifiers,
} from '../../utils/modifiers';

export type NativeDatePickerProps = {
  selection: string;
  displayedComponents?: string[];
  onValueChange?: (e: {
    nativeEvent: {
      value: string;
    };
  }) => void;
  modifiers?: NativeModifiersProp;
  label?: string;
  style?: StyleProp<ViewStyle>;
};

export type DatePickerProps = {
  selection: Date | Binding<Date>;
  displayedComponents?: 'date' | 'hourAndMinute' | ('date' | 'hourAndMinute')[];
  onChange?: (date: Date) => void;
  modifiers?: ModifiersProp;
  label?: string;
  style?: StyleProp<ViewStyle>;
} & _Modifiers;
