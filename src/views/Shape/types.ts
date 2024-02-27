import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Color } from '../../utils/colors';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeShapeProps = {
  modifiers?: NativeModifiersProp;
  cornerRadius?: number;
  cornerRadii?: {
    topLeading: number;
    topTrailing: number;
    bottomLeading: number;
    bottomTrailing: number;
  };
  style?: StyleProp<ViewStyle>;
  type:
    | 'Circle'
    | 'Rectangle'
    | 'RoundedRectangle'
    | 'Capsule'
    | 'Ellipse'
    | 'UnevenRoundedRectangle';
  onEvent?: (
    e: NativeSyntheticEvent<{
      [key: string]: any;
    }>
  ) => void;
};

export type ShapeProps = {
  style?: StyleProp<ViewStyle>;
  fill?: Color;
  stroke?: Color | { color: Color; lineWidth: number };
} & Modifiers;
