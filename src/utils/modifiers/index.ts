import { StyleProp, ViewStyle } from 'react-native';
import { Border } from '../border';
import { FontStyles, FontWeight } from '../fonts';
import { Frame } from '../frame';
import { Padding } from '../padding';
import { Shadow } from '../shadow';

export type Modifiers = {
  backgroundColor?: string;
  padding?: Padding;
  cornerRadius?: number;
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
  font?: keyof typeof FontStyles;
  fontWeight?: keyof typeof FontWeight;
  fontSize?: number;
  foregroundColor?: string;
  customFont?: string;
};

export type WithChildren = {
  children?: React.ReactElement | React.ReactElement[];
};
