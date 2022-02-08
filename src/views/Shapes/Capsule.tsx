import React from 'react';
import { ShapeModifiers } from '../../utils/modifiers';
import { Rectangle } from './Rectangle';

export const Capsule = ({ cornerRadius = 99999, ...rest }: ShapeModifiers) => {
  return <Rectangle cornerRadius={cornerRadius} {...rest} />;
};
