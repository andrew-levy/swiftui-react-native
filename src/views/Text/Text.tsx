import React from 'react';
import { Text as RNText } from 'react-native';
import { systemColor, UIColor } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { getPadding } from '../../utils/padding';
import {
  VerticalAlignment,
  HorizontalAlignment,
  Padding,
  Shadow,
} from '../../types/propTypes';
import { getShadow } from '../../utils/shadow';
import { useColorScheme } from '../../hooks/useColorScheme';

export type TextProps = {
  fontSize?: number;
  font?: string;
  foregroundColor?: string;
  fontWeight?: string;
  alignment?: VerticalAlignment | HorizontalAlignment;
  padding?: Padding;
  cornerRadius?: number;
  shadow?: Shadow;
  buttonChild?: boolean;
};

export const Text: React.FC<TextProps> = ({
  fontSize = 18,
  font,
  foregroundColor = UIColor.black,
  fontWeight,
  alignment = 'center',
  padding,
  cornerRadius = 0,
  shadow,
  children,
  buttonChild,
  ...props
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <RNText
      style={{
        color: buttonChild
          ? systemColor(UIColor.systemBlue, colorScheme)
          : systemColor(foregroundColor, colorScheme),
        fontSize,
        fontWeight: Fonts.weights[fontWeight] || Fonts.weights.normal,
        fontFamily: Fonts.fonts[font] || Fonts.fonts.system,
        textAlign: alignment === 'leading' ? 'left' : 'center',
        borderRadius: cornerRadius,
        ...getShadow(shadow),
        ...getPadding(padding),
      }}
      {...props}
    >
      {children}
    </RNText>
  );
};
