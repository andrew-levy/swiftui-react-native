import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { BooleanBinding } from '../../utils/binding';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeToggleProps = {
  isOn: boolean;
  title?: string;
  modifiers?: NativeModifiersProp;
  onEvent?: (e: NativeSyntheticEvent<{ [key: string]: any }>) => void;
  style?: StyleProp<ViewStyle>;
};
export type ToggleProps = {
  isOn: BooleanBinding | boolean;
  title?: string;
  onChange?: (value?: boolean) => void;
  style?: StyleProp<ViewStyle>;
} & Modifiers;
