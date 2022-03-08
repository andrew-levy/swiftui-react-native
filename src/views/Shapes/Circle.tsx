import React from 'react';
import { Dimensions } from 'react-native';
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

const getDiameter = (frame: ShapeModifiers['frame']): number | `${number}%` => {
  if (!frame) return 0;
  const wWidth = Dimensions.get('window').width;
  const wHeight = Dimensions.get('window').height;

  const widthFromFrame = frame.width || 0;
  const heightFromFrame = frame.height || 0;

  const width =
    typeof widthFromFrame === 'string'
      ? (parseFloat(widthFromFrame) / 100) * wWidth
      : widthFromFrame;

  const height =
    typeof heightFromFrame === 'string'
      ? (parseFloat(heightFromFrame) / 100) * wHeight
      : heightFromFrame;

  return Math.max(width, height);
};
