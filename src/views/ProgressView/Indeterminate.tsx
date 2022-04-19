import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { useLifecycle } from '../../hooks/useLifecycle';
import { useColorScheme } from '../../hooks/useColorScheme';
import { getBorder } from '../../utils/border';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getFrame } from '../../utils/frame';
import { Modifiers } from '../../utils/modifiers';
import { getPadding } from '../../utils/padding';
import { getShadow } from '../../utils/shadow';
import { getTransform } from '../../utils/transform';
import { UIColor, getColor } from '../../utils/colors';
import { useAlert } from '../../hooks/useAlert';

type IndeterminateProps = Modifiers & {
  tint?: UIColor;
  scaleEffect?: number;
};

export const Indeterminate = ({
  backgroundColor,
  opacity,
  frame = { width: 20, height: 20 },
  cornerRadius,
  rotationEffect,
  scaleEffect,
  padding,
  border,
  shadow,
  zIndex,
  style,
  tint,
  alert,
  onAppear,
  onDisappear,
}: IndeterminateProps) => {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);
  const colorScheme = useColorScheme();

  return (
    <ActivityIndicator
      color={getColor(tint, colorScheme)}
      style={[
        {
          opacity,
          zIndex,
          backgroundColor: getColor(backgroundColor, colorScheme),
          ...getCornerRadius(cornerRadius),
          ...getShadow(shadow),
          ...getPadding(padding),
          ...getFrame(frame),
          ...getBorder(border),
          ...getTransform(scaleEffect, rotationEffect),
        },
        style,
      ]}
    />
  );
};
