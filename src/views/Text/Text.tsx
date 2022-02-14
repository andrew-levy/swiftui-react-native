import React from 'react';
import { StyleProp, Text as RNText, TextStyle } from 'react-native';
import { getPadding } from '../../utils/padding';
import { getShadow } from '../../utils/shadow';
import { getFrame } from '../../utils/frame';
import { getBorder } from '../../utils/border';
import { useLifecycle } from '../../hooks/useLifecycle';
import { getFont } from '../../utils/fonts';
import { Modifiers, TextModifiers } from '../../utils/modifiers';
import { TextAlignment } from '../../utils/alignments';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';
import { useColorScheme } from '../../hooks/useColorScheme';
import { getColor } from '../../utils/colors';

type TextProps = Omit<Modifiers, 'style'> &
  TextModifiers & {
    textCase?: 'lower' | 'upper' | 'capitalize';
    alignment?: TextAlignment;
    style?: StyleProp<TextStyle>;
  };

export const Text: React.FC<TextProps> = ({
  font = 'body',
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
  const { colorScheme } = useColorScheme();
  return (
    <RNText
      style={[
        {
          opacity,
          zIndex,
          backgroundColor: getColor(backgroundColor, colorScheme),
          color: getColor(foregroundColor, colorScheme, 'label'),
          textAlign: getTextAlignment(alignment),
          ...getCornerRadius(cornerRadius),
          ...getTextCase(textCase),
          ...getFont(font, fontSize, fontWeight, customFont),
          ...getShadow(shadow),
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
