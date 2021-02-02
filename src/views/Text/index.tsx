import React from 'react';
import { Text as RNText } from 'react-native';
import { UIColor } from '../../themes/colors';
import { Fonts } from '../../themes/fonts';
import { getPadding } from '../../utils/getPadding';
import {
  VerticalAlignment,
  HorizontalAlignment,
  Padding,
  Shadow,
} from '../../types/stylePropTypes';
import { getShadow } from '../../utils/getShadow';

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
  return (
    <RNText
      style={{
        color: buttonChild ? UIColor.systemBlue : foregroundColor,
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
