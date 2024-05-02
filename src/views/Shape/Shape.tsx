import { ShapeCornerRadii, ShapeProps } from './types';

export const Circle = (props: ShapeProps) => null;
export const Capsule = (props: ShapeProps) => null;
export const Ellipse = (props: ShapeProps) => null;
export const RoundedRectangle = (
  props: ShapeProps & { cornerRadius: number }
) => null;
export const Rectangle = (props: ShapeProps) => null;

export const UnevenRoundedRectangle = (props: ShapeProps & ShapeCornerRadii) =>
  null;
