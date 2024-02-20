import { StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeShapeProps = {
  modifiers?: NativeModifiersProp;
  cornerRadius?: number;
  style?: StyleProp<ViewStyle>;
  type: 'Circle' | 'Rectangle' | 'RoundedRectangle' | 'Capsule';
};

export type ShapeProps = {
  style?: StyleProp<ViewStyle>;
  cornerRadius?: number;
} & Modifiers;
