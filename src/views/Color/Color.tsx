import React from 'react';
import type { UIColor } from '../../utils/colors';
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

type ColorProps = Omit<ShapeModifiers, 'fill'> & {
  color:
    | UIColor
    | {
        red?: number;
        blue?: number;
        green?: number;
      };
};

type ColorSubComponentProps = Omit<ShapeModifiers, 'fill'> & {
  color?: UIColor;
};

const getColor = (colorValue: ColorProps['color']) => {
  if (typeof colorValue === 'string') return colorValue as UIColor;
  return `rgb(${colorValue.red || 0}, ${colorValue.green || 0}, ${
    colorValue.blue || 0
  })` as UIColor;
};

const ColorSubComponent = ({ color, ...props }: ColorSubComponentProps) => {
  return <Rectangle fill={color} {...props} />;
};

export const Color: ColorView = ({ color, ...rest }: ColorProps) => {
  const colorValue = getColor(color);
  return <Rectangle fill={colorValue} {...rest} />;
};

Color.black = (props) => <ColorSubComponent color="black" {...props} />;
Color.blue = (props) => <ColorSubComponent color="blue" {...props} />;
Color.brown = (props) => <ColorSubComponent color="brown" {...props} />;
Color.clear = (props) => <ColorSubComponent color="clear" {...props} />;
Color.cyan = (props) => <ColorSubComponent color="cyan" {...props} />;
Color.gray = (props) => <ColorSubComponent color="gray" {...props} />;
Color.green = (props) => <ColorSubComponent color="green" {...props} />;
Color.indigo = (props) => <ColorSubComponent color="indigo" {...props} />;
Color.mint = (props) => <ColorSubComponent color="mint" {...props} />;
Color.orange = (props) => <ColorSubComponent color="orange" {...props} />;
Color.pink = (props) => <ColorSubComponent color="pink" {...props} />;
Color.purple = (props) => <ColorSubComponent color="purple" {...props} />;
Color.red = (props) => <ColorSubComponent color="red" {...props} />;
Color.teal = (props) => <ColorSubComponent color="teal" {...props} />;
Color.white = (props) => <ColorSubComponent color="white" {...props} />;
Color.yellow = (props) => <ColorSubComponent color="yellow" {...props} />;
Color.accentColor = (props) => (
  <ColorSubComponent color="accentColor" {...props} />
);
Color.primary = (props) => <ColorSubComponent color="primary" {...props} />;
Color.secondary = (props) => <ColorSubComponent color="secondary" {...props} />;
