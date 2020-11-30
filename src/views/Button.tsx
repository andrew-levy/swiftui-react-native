import React from 'react';
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
  children?: React.ReactElement<any>;
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

const StyledButtonOpacity = styled.TouchableOpacity`
  ${buttonStyles}
`;
const StyledButton = styled.Button`
  ${buttonStyles}
`;

export const Button = ({ action, text, children }: ButtonProps) => {
  return (
    <>
      {text ? (
        <StyledButton title={text} onPress={action} buttonChild={true} />
      ) : (
        <StyledButtonOpacity onPress={action}>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              ...child.props,
              buttonChild: true,
            })
          )}
        </StyledButtonOpacity>
      )}
    </>
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
