import React, { createContext } from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';
import { Fonts } from '../themes/fonts';
import { Padding, Shadow } from '../types/stylePropTypes';

type ButtonProps = {
  action?: () => void;
  disabled?: boolean;
  text?: string;
  background?: string;
  padding?: Padding;
  cornerRadius?: number;
  shadow?: Shadow;
  border?: object;
  fontSize?: number;
  fontWeight?: number;
  foregroundColor?: string;
};

const buttonStyles = `${({
  background,
  alignment,
  cornerRadius,
  padding,
  frame,
  width,
}) => `
  background-color: ${
    background
      ? Colors.background[background] || Colors.background.white
      : Colors.background.white
  };
  align-items: ${
    alignment
      ? Fonts.alignment[alignment] || Fonts.alignment.center
      : Fonts.alignment.center
  };
  justify-content: center;
  border-radius: ${cornerRadius || 0};
  padding: ${padding || 0}
  width: ${width || '100'}%;
`}`;
export const ButtonWrapperContext = createContext(null);
const StyledButtonOpacity = styled.TouchableOpacity`
  ${buttonStyles}
`;
const StyledButton = styled.Button`
  ${buttonStyles}
`;

export const Button: React.FC<ButtonProps> = ({ action, text, children }) => {
  return (
    <ButtonWrapperContext.Provider value='button'>
      {text ? (
        <StyledButton title={text} onPress={action} />
      ) : (
        <StyledButtonOpacity onPress={action}>{children}</StyledButtonOpacity>
      )}
    </ButtonWrapperContext.Provider>
  );
};

/* PROPS:
 * font
 * font weight
 * font size
 * foreground color
 * background color
 * padding
 * margin
 * corner radius
 * shaddow radius
 */
