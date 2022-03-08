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
  if (!frame) return 0;
  if ('width' in frame && 'height' in frame) {
    if (typeof frame.width === 'number' && typeof frame.height === 'number')
      return Math.max(frame.width, frame.height);
    else if (typeof frame.width === 'number') return frame.width;
    else if (typeof frame.height === 'number') return frame.height;
  } else if ('width' in frame) return frame.width;
  else if ('height' in frame) return frame.height;
};
