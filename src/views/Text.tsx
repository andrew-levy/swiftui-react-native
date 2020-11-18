import React, { useContext } from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';
import { Fonts } from '../themes/fonts';
import { ButtonWrapperContext } from './Button';

const StyledText = styled.Text`
  ${({ foregroundColor, fontSize, fontWeight, font, alignment, buttonType }) =>
    `color: ${
      buttonType
        ? '#2997ff'
        : foregroundColor
        ? Colors.foreground[foregroundColor] || Colors.foreground.black
        : Colors.foreground.black
    }
		font-size: ${fontSize ? fontSize + 'px' : '16px'}
		font-weight: ${
      fontWeight
        ? Fonts.weights[fontWeight] || Fonts.weights.normal
        : Fonts.weights.normal
    };
		font-family: ${
      font ? Fonts.fonts[font] || Fonts.fonts.system : Fonts.fonts.system
    };
		text-align: ${alignment ? alignment : 'center'}
		`}
`;

type TextProps = {
  fontSize?: number;
  foregroundColor?: string;
  fontWeight?: string;
  alignment?: 'leading' | 'center' | 'trailing';
};

export const Text: React.FC<TextProps> = ({
  fontSize,
  foregroundColor,
  fontWeight,
  alignment,
  children,
}) => {
  const buttonType = useContext(ButtonWrapperContext);
  console.log(buttonType);
  return (
    <StyledText
      fontSize={fontSize}
      foregroundColor={foregroundColor}
      fontWeight={fontWeight}
      alignment={alignment}
      buttonType={buttonType}
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
