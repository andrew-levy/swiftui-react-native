import { StyleProp, ViewStyle } from 'react-native';
import { Binding } from '../../utils/binding';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeSliderProps = {
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
export type SliderProps = {
  step?: number;
  range?: [number, number];
  value: Binding<number> | number;
  onChange?: (value?: number) => void;
  style?: StyleProp<ViewStyle>;
} & Modifiers;
