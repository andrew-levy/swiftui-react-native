import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { type Color } from '../../utils/colors';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeColorProps = {
  color: string;
  modifiers?: NativeModifiersProp;
  style: StyleProp<ViewStyle>;
  onEvent?: (e: NativeSyntheticEvent<{ [key: string]: any }>) => void;
};

export type ColorProps = {
  color: Color;
  style?: StyleProp<ViewStyle>;
} & Modifiers;

export type ColorSubComponentProps = {
  color?: Color;
} & Modifiers;

export interface ColorView {
  (props: ColorProps): JSX.Element;
  black: (props: ColorSubComponentProps) => JSX.Element;
  blue: (props: ColorSubComponentProps) => JSX.Element;
  brown: (props: ColorSubComponentProps) => JSX.Element;
  clear: (props: ColorSubComponentProps) => JSX.Element;
  cyan: (props: ColorSubComponentProps) => JSX.Element;
  gray: (props: ColorSubComponentProps) => JSX.Element;
  green: (props: ColorSubComponentProps) => JSX.Element;
  indigo: (props: ColorSubComponentProps) => JSX.Element;
  mint: (props: ColorSubComponentProps) => JSX.Element;
  orange: (props: ColorSubComponentProps) => JSX.Element;
  pink: (props: ColorSubComponentProps) => JSX.Element;
  purple: (props: ColorSubComponentProps) => JSX.Element;
  red: (props: ColorSubComponentProps) => JSX.Element;
  teal: (props: ColorSubComponentProps) => JSX.Element;
  white: (props: ColorSubComponentProps) => JSX.Element;
  yellow: (props: ColorSubComponentProps) => JSX.Element;
  accentColor: (props: ColorSubComponentProps) => JSX.Element;
  primary: (props: ColorSubComponentProps) => JSX.Element;
  secondary: (props: ColorSubComponentProps) => JSX.Element;
}
