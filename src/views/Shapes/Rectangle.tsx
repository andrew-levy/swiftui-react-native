import React from 'react';
import { View } from 'react-native';
import { useLifecycle } from '../../hooks/useLifecycle';
import { getBorder } from '../../utils/border';
import { getCornerRadius } from '../../utils/cornerRadius';
import { ShapeModifiers } from '../../utils/modifiers';
import { getPadding } from '../../utils/padding';
import { getTransform } from '../../utils/transform';
import { getShadow } from '../../utils/shadow';
import { getFrame } from '../../utils/frame';
import { useUIColor } from '../../hooks/useUIColor';

export const Rectangle = ({
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
}: ShapeModifiers) => {
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

const getRectDims = (frame: ShapeModifiers['frame']) => {
  if (!frame) return { rectWidth: 0, rectHeight: 0 };
  let rectWidth;
  let rectHeight;

  if ('width' in frame && 'height' in frame) {
    rectWidth = frame.width;
    rectHeight = frame.height;
  } else if ('width' in frame) {
    rectWidth = frame.width;
    rectHeight = '100%';
  } else if ('height' in frame) {
    rectWidth = '100%';
    rectHeight = frame.height;
  }

  return { rectWidth, rectHeight };
};
