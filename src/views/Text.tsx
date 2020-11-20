import React, { useContext } from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';
import { Fonts } from '../themes/fonts';
import { ButtonWrapperContext } from './Button';
import { getPaddingFromProps } from '../utils/padding';

const StyledText = styled.Text`
  ${({
    foregroundColor,
    fontSize,
    fontWeight,
    font,
    alignment,
    textType,
    padding,
  }) => {
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;
    return `color: ${
      textType
        ? `${Colors.foreground.buttonText}`
        : foregroundColor
        ? Colors.foreground[foregroundColor] || Colors.foreground.black
        : Colors.foreground.black
    }
		font-size: ${fontSize ? fontSize + 'px' : '18px'}
		font-weight: ${
      fontWeight
        ? Fonts.weights[fontWeight] || Fonts.weights.normal
        : Fonts.weights.normal
    };
		font-family: ${
      font ? Fonts.fonts[font] || Fonts.fonts.system : Fonts.fonts.system
    };
    text-align: ${alignment ? alignment : 'center'};
    padding-top: ${paddingTop}px;
    padding-right: ${paddingRight}px;
    padding-bottom: ${paddingBottom}px;
    padding-left: ${paddingLeft}px;
    text-shaddow-color: ${Colors.foreground.buttonText}
    `;
  }}
`;

type TextProps = {
  fontSize?: number;
  foregroundColor?: string;
  fontWeight?: string;
  alignment?: 'leading' | 'center' | 'trailing';
  padding?: number | [Array<string>, number];
};

export const Text: React.FC<TextProps> = ({
  fontSize,
  foregroundColor,
  fontWeight,
  alignment,
  padding,
  children,
}) => {
  const textType = useContext(ButtonWrapperContext);

  return (
    <StyledText
      fontSize={fontSize}
      foregroundColor={foregroundColor}
      fontWeight={fontWeight}
      alignment={alignment}
      padding={getPaddingFromProps(padding)}
      textType={textType}
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
