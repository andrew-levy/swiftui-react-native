import React from 'react';
import { View } from 'react-native';
import { useLifecycle } from '../../hooks/useLifecycle';
import { getBorder } from '../../utils/border';
import { getCornerRadius } from '../../utils/cornerRadius';
import { Modifiers } from '../../utils/modifiers';
import { getPadding } from '../../utils/padding';
import { getTransform } from '../../utils/transform';
import { getShadow } from '../../utils/shadow';
import { getFrame } from '../../utils/frame';
import { useUIColor } from '../..';

type RectangleProps = Omit<Modifiers, 'backgroundColor'> & {
  fill?: string;
  frame: { width?: number; height?: number };
};

export const Rectangle: React.FC<RectangleProps> = ({
  fill,
  opacity,
  frame,
  cornerRadius,
  scaleEffect,
  rotationEffect,
  padding,
  border,
  shadow,
  zIndex,
  style,
  onAppear,
  onDisappear,
}) => {
  useLifecycle(onAppear, onDisappear);
  const UIColor = useUIColor();
  const { rectWidth, rectHeight } = getRectDims(frame);

  return (
    <View
      style={[
        {
          opacity,
          backgroundColor: fill || UIColor.systemBackground,
          zIndex,
          ...getFrame({ width: rectWidth, height: rectHeight }),
          ...getCornerRadius(cornerRadius),
          ...getShadow(shadow),
          ...getPadding(padding),
          ...getBorder(border),
          ...getTransform(scaleEffect, rotationEffect),
        },
        style,
      ]}
    />
  );
};

const getRectDims = (frame: { width?: number; height?: number }) => {
  if (!frame) return { rectWidth: 0, rectHeight: 0 };
  let rectWidth;
  let rectHeight;

  if (frame.width && frame.height) {
    rectWidth = frame.width;
    rectHeight = frame.height;
  } else if (frame.width) {
    rectWidth = frame.width;
    rectHeight = '100%';
  } else if (frame.height) {
    rectWidth = '100%';
    rectHeight = frame.height;
  }

  return { rectWidth, rectHeight };
};
