import { ProcessedColorValue, StyleProp, ViewStyle } from 'react-native';
import { UIColor } from '../../utils/colors';
import { NativeModifiersProp, _Modifiers } from '../../utils/modifiers';

export type NativeColorProps = {
  color: ProcessedColorValue;
  modifiers?: NativeModifiersProp;
  style: StyleProp<ViewStyle>;
};

export type ColorProps = {
  color:
    | UIColor
    | {
        red?: number;
        blue?: number;
        green?: number;
      };
} & _Modifiers;

export type ColorSubComponentProps = {
  color?: UIColor;
} & _Modifiers;

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
