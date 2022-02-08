import React from 'react';
import { Modifiers } from '../../utils/modifiers';
import { Rectangle } from './Rectangle';

type CircleProps = Omit<Modifiers, 'backgroundColor'> & {
  fill?: string;
  frame: { width: number; } | { height: number } | { width: number; height: number };
};

export const Circle: React.FC<CircleProps> = ({
  frame,
  cornerRadius = 99999,
  ...rest
}) => {
  const diameter = getDiameter(frame);
  return (
    <Rectangle
      frame={{ width: diameter, height: diameter }}
      cornerRadius={cornerRadius}
      {...rest}
    />
  );
};

const getDiameter = (frame: { width: number; } | { height: number } | { width: number; height: number }) => {
  let diameter;
  const frameWidth = frame['width'];
  const frameHeight = frame['height'];
  if (frameWidth && frameHeight) diameter = Math.max(frameWidth, frameHeight);
  else if (frameWidth && !frameHeight) diameter = frameWidth;
  else if (frameHeight && !frameWidth) diameter = frameHeight;
  return diameter;
};
