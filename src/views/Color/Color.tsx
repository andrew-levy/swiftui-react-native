import React from 'react';
import { Color as ColorType } from '../../utils/colors';
import { ShapeModifiers } from '../../utils/modifiers';
import { Rectangle } from '../Shapes';

type ColorProps = Omit<ShapeModifiers, 'fill'> & {
  red?: number;
  blue?: number;
  green?: number;
};

// map the name of the subcomponent to the color value
const colorSubComponents = {
  red: '#FF3B30FF',
  blue: '#FF4081FF',
};

// Example: <Color red={255} green={255} blue={255} />
export const Color = ({
  red = 0,
  green = 0,
  blue = 0,
  ...rest
}: ColorProps) => {
  return <Rectangle fill={`rgb(${red},${green},${blue})`} {...rest} />;
};

type ColorSubComponentProps = Omit<ShapeModifiers, 'fill'> & {
  color: ColorType;
};

// Example: <Color.red />
const ColorSubComponent = ({ color, ...rest }: ColorSubComponentProps) => {
  return <Rectangle fill={color} {...rest} />;
};

// Dynamically set the subcomponents
Object.keys(colorSubComponents).forEach((color) => {
  Color[color] = ({ ...rest }: Omit<ShapeModifiers, 'fill'>) => (
    <ColorSubComponent color={colorSubComponents[color]} {...rest} />
  );
});
