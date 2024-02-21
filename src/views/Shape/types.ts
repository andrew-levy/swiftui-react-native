import { StyleProp, ViewStyle } from 'react-native';
import { UIColor } from '../../utils/colors';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeShapeProps = {
  modifiers?: NativeModifiersProp;
  cornerRadius?: number;
  style?: StyleProp<ViewStyle>;
  type: 'Circle' | 'Rectangle' | 'RoundedRectangle' | 'Capsule' | 'Ellipse';
};

export type ShapeProps = {
  style?: StyleProp<ViewStyle>;
  cornerRadius?: number;
  fill?: UIColor;
  stroke?: UIColor | { color: UIColor; lineWidth: number };
} & Modifiers;
