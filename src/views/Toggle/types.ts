import { StyleProp, ViewStyle } from 'react-native';
import { BooleanBinding } from '../../utils/binding';
import { NativeModifiersProp, _Modifiers } from '../../utils/modifiers';

export type NativeToggleProps = {
  isOn: boolean;
  label?: string;
  modifiers?: NativeModifiersProp;
  onValueChange?: (e: {
    nativeEvent: {
      value: boolean;
    };
  }) => void;
  style?: StyleProp<ViewStyle>;
};
export type ToggleProps = {
  isOn: BooleanBinding | boolean;
  label?: string;
  onChange?: (value?: boolean) => void;
  style?: StyleProp<ViewStyle>;
} & _Modifiers;
