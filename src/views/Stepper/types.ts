import { StyleProp, ViewStyle } from 'react-native';
import { Binding } from '../../utils/binding';
import { NativeModifiersProp, _Modifiers } from '../../utils/modifiers';

export type NativeStepperProps = {
  step?: number;
  range?: [number, number];
  value: number;
  modifiers?: NativeModifiersProp;
  onValueChange?: (e: {
    nativeEvent: {
      value: number;
    };
  }) => void;
  style?: StyleProp<ViewStyle>;
};

export type StepperProps = {
  step?: number;
  range?: [number, number];
  value: Binding<number>;
  onChange?: (value?: number) => void;
  style?: StyleProp<ViewStyle>;
} & _Modifiers;
