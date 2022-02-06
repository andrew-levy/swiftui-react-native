import React from 'react';
import { StyleProp, Text as RNText, TextStyle } from 'react-native';
import { getPadding } from '../../utils/padding';
import { getShadow } from '../../utils/shadow';
import { getFrame } from '../../utils/frame';
import { getBorder } from '../../utils/border';
import { useLifecycle } from '../../hooks/useLifecycle';
import { Font, getFont } from '../../utils/fonts';
import { Modifiers, TextModifiers } from '../../utils/modifiers';
import { HorizontalAlignment } from '../../utils/alignments';
import { useUIColor } from '../../hooks/useUIColor';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getScaleEffect } from '../../utils/scaleEffect';
import { getRotationEffect } from '../../utils/rotationEffect';

type TextProps = Omit<Modifiers, 'style'> &
  TextModifiers & {
    textCase?: 'lower' | 'upper' | 'capitalize';
    alignment?: HorizontalAlignment;
    style?: StyleProp<TextStyle>;
  };

export const Text: React.FC<TextProps> = ({
  font = Font.body,
  fontSize,
  fontWeight,
  customFont,
  foregroundColor,
  alignment = 'center',
  padding,
  cornerRadius,
  rotationEffect,
  scaleEffect,
  shadow,
  textCase,
  backgroundColor,
  border,
  opacity,
  frame,
  zIndex,
  style,
  onAppear,
  onDisappear,
  children,
}) => {
  useLifecycle(onAppear, onDisappear);
  const UIColor = useUIColor();
  return (
    <RNText
      style={[
        {
          backgroundColor,
          color: foregroundColor || UIColor.label,
          textAlign: getTextAlignment(alignment),
          opacity,
          zIndex,
          ...getCornerRadius(cornerRadius),
          ...getTextCase(textCase),
          ...getFont(font, fontSize, fontWeight, customFont),
          ...getShadow(shadow),
          ...getPadding(padding),
          ...getFrame(frame),
          ...getBorder(border),
          ...getScaleEffect(scaleEffect),
        },
        getRotationEffect(rotationEffect),
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

function getTextAlignment(alignment: HorizontalAlignment) {
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
