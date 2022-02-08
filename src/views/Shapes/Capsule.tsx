import React from 'react';
import { Modifiers } from '../../utils/modifiers';
import { Rectangle } from './Rectangle';

type CapsuleProps = Omit<Modifiers, 'backgroundColor'> & {
  fill?: string;
  frame: { width?: number; height?: number };
};

export const Capsule: React.FC<CapsuleProps> = ({
  cornerRadius = 99999,
  ...rest
}) => {
  return <Rectangle cornerRadius={cornerRadius} {...rest} />;
};
