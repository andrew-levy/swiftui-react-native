import React, { createContext } from 'react';
import styled from 'styled-components';

type ButtonProps = {
  action?: () => void;
  disabled?: boolean;
};

export const ButtonWrapperContext = createContext(null);
const StyledButton = styled.TouchableOpacity``;

export const Button: React.FC<ButtonProps> = ({ action, children }) => {
  return (
    <ButtonWrapperContext.Provider value='button'>
      <StyledButton onPress={action}>{children}</StyledButton>
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
