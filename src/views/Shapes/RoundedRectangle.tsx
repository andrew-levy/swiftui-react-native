import React from 'react';
import { ShapeModifiers } from '../../utils/modifiers';
import { Rectangle } from './Rectangle';

export const RoundedRectangle = ({
  cornerRadius = 10,
  ...rest
}: ShapeModifiers) => {
  return <Rectangle cornerRadius={cornerRadius} {...rest} />;
};
