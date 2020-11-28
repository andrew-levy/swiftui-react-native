import React, { useContext } from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';
import { Fonts } from '../themes/fonts';
import { ButtonWrapperContext } from './Button';
import { getPaddingFromProps } from '../styleProps/padding';
import { getShadowFromProps } from '../styleProps/shadow';
import { Alignment, Padding, Shadow } from '../types/stylePropTypes';

const StyledText = styled.Text`
  ${({
    foregroundColor,
    fontSize,
    fontWeight,
    font,
    alignment,
    textType,
    padding,
    cornerRadius,
    shadow,
  }) =>
    `color: ${
      textType
        ? `${Colors.foreground.buttonText}`
        : foregroundColor
        ? Colors.foreground[foregroundColor] || Colors.foreground.black
        : Colors.foreground.black
    }
		font-size: ${fontSize ? fontSize : '18'}px;
		font-weight: ${
      fontWeight
        ? Fonts.weights[fontWeight] || Fonts.weights.normal
        : Fonts.weights.normal
    };
		font-family: ${
      font ? Fonts.fonts[font] || Fonts.fonts.system : Fonts.fonts.system
    };
    text-align: ${alignment === 'leading' ? 'left' : 'center'};
    border-radius: ${cornerRadius || 0}px;
    ${getPaddingFromProps(padding)}
    ${getShadowFromProps(shadow)}
    `}
`;

type TextProps = {
  fontSize?: number;
  foregroundColor?: string;
  fontWeight?: string;
  alignment?: Alignment;
  padding?: Padding;
  cornerRadius?: number;
  shadow?: Shadow;
};

export const Text: React.FC<TextProps> = ({
  fontSize,
  foregroundColor,
  fontWeight,
  alignment,
  padding,
  cornerRadius,
  shadow,
  children,
  ...props
}) => {
  const textType = useContext(ButtonWrapperContext);

  return (
    <StyledText
      fontSize={fontSize}
      foregroundColor={foregroundColor}
      fontWeight={fontWeight}
      alignment={alignment}
      padding={padding}
      cornerRadius={cornerRadius}
      shadow={shadow}
      textType={textType}
      {...props}
    >
      {children}
    </StyledText>
  );
};

/* PROPS:
 * font
 * font weight
 * font size
 * foreground color
 * background
 * padding
 * margin
 * border
 * underline
 * italics
 * zindex
 * hidden
 */
