import React, { createContext } from 'react';
import styled from 'styled-components';
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

export const ButtonWrapperContext = createContext(null);
const StyledButtonOpacity = styled.TouchableOpacity``;
const StyledButton = styled.Button``;

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
