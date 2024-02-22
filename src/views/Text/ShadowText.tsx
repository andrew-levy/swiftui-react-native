import React from 'react';
import { Text as RNText } from 'react-native';
import { getBorder } from '../../utils/border';
import { getFont } from '../../utils/fonts';
import { getFrame } from '../../utils/frame';
import { getPadding } from '../../utils/padding';
import { getTransform } from '../../utils/transform';
import { TextProps } from './types';

export const ShadowText = ({
  font = 'body',
  italic,
  padding,
  rotationEffect,
  fontWeight,
  scaleEffect,
  border,
  frame,
  style,
  children,
}: TextProps) => {
  return (
    <RNText
      style={[
        {
          ...getFont(font, fontWeight, italic),
          ...getPadding(padding),
          ...getFrame(frame),
          ...getBorder(border),
          ...getTransform(scaleEffect, rotationEffect),
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};
