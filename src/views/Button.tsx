import React, { createContext } from 'react';
import styled from 'styled-components';

type ButtonProps = {
  action?: () => void;
  label?: string;
  disabled?: boolean;
};

export const ButtonWrapperContext = createContext(null);
const StyledButtonOpacity = styled.TouchableOpacity``;
const StyledButton = styled.Button``;

export const Button: React.FC<ButtonProps> = ({ action, label, children }) => {
  return (
    <ButtonWrapperContext.Provider value='button'>
      {label ? (
        <StyledButton title={label} onPress={action} />
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
