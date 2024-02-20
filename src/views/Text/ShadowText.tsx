import React from 'react';
import { Text as RNText } from 'react-native';
import { useAlert } from '../../hooks/useAlert';
import { TextAlignment } from '../../utils/alignments';
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
  scaleEffect,
  border,
  frame,
  style,
  alert,
  children,
}: TextProps) => {
  useAlert(alert);
  return (
    <RNText
      style={[
        {
          ...getFont(font, null, null, italic),
          ...getPadding(padding),
          ...getFrame(frame),
          ...getBorder(border, 'light'),
          ...getTransform(scaleEffect, rotationEffect),
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

function getTextCase(textCase: string) {
  switch (textCase) {
    case 'lower':
      return { textTransform: 'lowercase' };
    case 'upper':
      return { textTransform: 'uppercase' };
    case 'capitalize':
      return { textTransform: 'capitalize' };
    default:
      return null;
  }
}

function getTextAlignment(alignment: TextAlignment) {
  switch (alignment) {
    case 'leading':
      return 'left';
    case 'trailing':
      return 'right';
    case 'center':
      return 'center';
    default:
      return 'center';
  }
}
