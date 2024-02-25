import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Binding } from '../../utils/binding';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeDatePickerProps = {
  selection: string;
  displayedComponents?: string[];
  modifiers?: NativeModifiersProp;
  title?: string;
  style?: StyleProp<ViewStyle>;
  onEvent?: (e: NativeSyntheticEvent<{ [key: string]: any }>) => void;
};

export type DatePickerProps = {
  selection: Date | Binding<Date>;
  displayedComponents?: 'date' | 'hourAndMinute' | ('date' | 'hourAndMinute')[];
  onChange?: (date: Date) => void;
  title?: string;
  style?: StyleProp<ViewStyle>;
} & Modifiers;
