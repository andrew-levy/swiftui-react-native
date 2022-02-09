import { StyleProp, ViewStyle } from 'react-native';
import { Color } from '../colors';
import { Border } from '../border';
import { Frame } from '../frame';
import { Padding } from '../padding';
import { Shadow } from '../shadow';
import { Rotation } from '../transform';
import { Fonts, FontWeights } from '../fonts';

export type Modifiers = {
  backgroundColor?: Color;
  padding?: Padding;
  cornerRadius?: number;
  rotationEffect?: Rotation;
  scaleEffect?: number;
  shadow?: Shadow;
  border?: Border;
  opacity?: number;
  frame?: Frame;
  zIndex?: number;
  style?: StyleProp<ViewStyle>;
  onAppear?: () => void;
  onDisappear?: () => void;
};

export type TextModifiers = {
  font?: keyof typeof Fonts;
  fontWeight?: keyof typeof FontWeights;
  fontSize?: number;
  foregroundColor?: Color;
  customFont?: string;
};

export type ShapeModifiers = Omit<Modifiers, 'backgroundColor' | 'frame'> & {
  fill?: Color;
  frame:
    | { width: number; height: number }
    | { width: number }
    | { height: number };
};

export type WithChildren = {
  children?: React.ReactElement | React.ReactElement[];
};
