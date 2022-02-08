import React from 'react';
import { ShapeModifiers } from '../../utils/modifiers';
import { Rectangle } from './Rectangle';

export const Circle = ({
  frame,
  cornerRadius = 99999,
  ...rest
}: ShapeModifiers) => {
  const diameter = getDiameter(frame);
  return (
    <Rectangle
      frame={{ width: diameter, height: diameter }}
      cornerRadius={cornerRadius}
      {...rest}
    />
  );
};

const getDiameter = (frame: ShapeModifiers['frame']) => {
  if ('width' in frame && 'height' in frame)
    return Math.max(frame.width, frame.height);
  else if ('width' in frame) return frame.width;
  else if ('height' in frame) return frame.height;
};
