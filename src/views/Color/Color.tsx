import React from 'react';
import { Color as ColorType } from '../../utils/colors';
import { ShapeModifiers } from '../../utils/modifiers';
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

type ColorProps = Omit<ShapeModifiers, 'fill'> &
  (
    | {
        red?: number;
        blue?: number;
        green?: number;
      }
    | {
        color: ColorType;
      }
  );

type ColorSubComponentProps = Omit<ShapeModifiers, 'fill'> & {
  color?: ColorType;
};

const ColorSubComponent = ({ color, ...props }: ColorSubComponentProps) => {
  return (
    <Rectangle frame={{ width: 100, height: 100 }} fill={color} {...props} />
  );
};

const getColor = (props: ColorProps) => {
  let propsColor = null;
  if (props['color']) {
    propsColor = props['color'];
  } else if (props['red'] || props['green'] || props['blue']) {
    propsColor = `rgb(${props['red'] || 0},${props['green'] || 0},${
      props['blue'] || 0
    })`;
  } else {
    propsColor = 'primary';
  }
  return propsColor;
};

export const Color: ColorView = (props: ColorProps) => {
  const color = getColor(props);
  return (
    <Rectangle frame={{ width: 100, height: 100 }} fill={color} {...props} />
  );
};

Color.black = (props) => <ColorSubComponent color="#000" {...props} />;
Color.blue = (props) => <ColorSubComponent color="#00f" {...props} />;
Color.brown = (props) => <ColorSubComponent color="#a52a2a" {...props} />;
Color.clear = (props) => <ColorSubComponent color="rgba(0,0,0,0)" {...props} />;
Color.cyan = (props) => <ColorSubComponent color="#0ff" {...props} />;
Color.gray = (props) => <ColorSubComponent color="#808080" {...props} />;
Color.green = (props) => <ColorSubComponent color="#008000" {...props} />;
Color.indigo = (props) => <ColorSubComponent color="#4b0082" {...props} />;
Color.mint = (props) => <ColorSubComponent color="#9acd32" {...props} />;
Color.orange = (props) => <ColorSubComponent color="#ffa500" {...props} />;
Color.pink = (props) => <ColorSubComponent color="#f0c0cb" {...props} />;
Color.purple = (props) => <ColorSubComponent color="#800080" {...props} />;
Color.red = (props) => <ColorSubComponent color="#f00" {...props} />;
Color.teal = (props) => <ColorSubComponent color="#008080" {...props} />;
Color.white = (props) => <ColorSubComponent color="#fff" {...props} />;
Color.yellow = (props) => <ColorSubComponent color="#ff0" {...props} />;
Color.accentColor = (props) => <ColorSubComponent color="#ffc107" {...props} />;
Color.primary = (props) => <ColorSubComponent color="#2196f3" {...props} />;
Color.secondary = (props) => <ColorSubComponent color="#ff9800" {...props} />;
