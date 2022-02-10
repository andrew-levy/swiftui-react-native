import React from 'react';
import { Color as ColorType } from '../../utils/colors';
import { Rectangle } from '../Shapes';

interface ColorView {
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

type ColorProps = {
  red?: number;
  blue?: number;
  green?: number;
};

type ColorSubComponentProps = { color?: ColorType };

const ColorSubComponent = ({ color }: ColorSubComponentProps) => {
  return <Rectangle frame={{ width: 100, height: 100 }} fill={color} />;
};

export const Color: ColorView = ({ red = 0, green = 0, blue = 0 }) => {
  return (
    <Rectangle
      frame={{ width: 100, height: 100 }}
      fill={`rgb(${red},${green},${blue})`}
    />
  );
};

Color.black = (props) => <ColorSubComponent color="#000" />;
Color.blue = (props) => <ColorSubComponent color="#00f" />;
Color.brown = (props) => <ColorSubComponent color="#a52a2a" />;
Color.clear = (props) => <ColorSubComponent color="rgba(0,0,0,0)" />;
Color.cyan = (props) => <ColorSubComponent color="#0ff" />;
Color.gray = (props) => <ColorSubComponent color="#808080" />;
Color.green = (props) => <ColorSubComponent color="#008000" />;
Color.indigo = (props) => <ColorSubComponent color="#4b0082" />;
Color.mint = (props) => <ColorSubComponent color="#9acd32" />;
Color.orange = (props) => <ColorSubComponent color="#ffa500" />;
Color.pink = (props) => <ColorSubComponent color="#f0c0cb" />;
Color.purple = (props) => <ColorSubComponent color="#800080" />;
Color.red = (props) => <ColorSubComponent color="#f00" />;
Color.teal = (props) => <ColorSubComponent color="#008080" />;
Color.white = (props) => <ColorSubComponent color="#fff" />;
Color.yellow = (props) => <ColorSubComponent color="#ff0" />;
Color.accentColor = (props) => <ColorSubComponent color="#ffc107" />;
Color.primary = (props) => <ColorSubComponent color="#2196f3" />;
Color.secondary = (props) => <ColorSubComponent color="#ff9800" />;
