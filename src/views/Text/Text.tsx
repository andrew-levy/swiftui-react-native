import React from 'react';
import { StyleProp, Text as RNText, TextStyle } from 'react-native';
import { getPadding } from '../../utils/padding';
import { getShadow } from '../../utils/shadow';
import { getFrame } from '../../utils/frame';
import { getBorder } from '../../utils/border';
import { useLifecycle } from '../../hooks/useLifecycle';
import { getFont } from '../../utils/fonts';
import { Modifiers, TextModifiers, WithChildren } from '../../utils/modifiers';
import { TextAlignment } from '../../utils/alignments';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';
import { useColorScheme } from '../../hooks/useColorScheme';
import { getColor } from '../../utils/colors';
import { useAlert } from '../../hooks/useAlert';
import { getTextDecoration } from '../../utils/textDecoration';

type TextProps = Omit<Modifiers, 'style'> &
  TextModifiers &
  WithChildren<{
    textCase?: 'lower' | 'upper' | 'capitalize';
    alignment?: TextAlignment;
    style?: StyleProp<TextStyle>;
  }>;

export const Text: React.FC<TextProps> = ({
  font = 'body',
  fontSize,
  fontWeight,
  customFont,
  bold,
  italic,
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
  alert,
  preferredColorScheme,
  strikethrough,
  underline,
  onAppear,
  onDisappear,
  children,
}) => {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);
  const colorScheme = useColorScheme(preferredColorScheme);
  return (
    <RNText
      style={[
        {
          opacity,
          zIndex,
          backgroundColor: getColor(backgroundColor, colorScheme),
          color: getColor(foregroundColor, colorScheme, 'label'),
          textAlign: getTextAlignment(alignment),
          ...getCornerRadius(cornerRadius, true),
          ...getTextCase(textCase),
          ...getFont(
            font,
            fontSize,
            bold ? 'bold' : fontWeight,
            customFont,
            italic
          ),
          ...getTextDecoration(strikethrough, underline, colorScheme),
          ...getShadow(shadow, colorScheme),
          ...getPadding(padding),
          ...getFrame(frame),
          ...getBorder(border, colorScheme),
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
