import React from 'react';
import styled from 'styled-components';
import { UIColor } from '../themes/colors';
import { Fonts } from '../themes/fonts';
import { Padding, Shadow } from '../types/stylePropTypes';
import { Text } from './Text';

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
  background-color: ${background ? background || UIColor.white : UIColor.white};
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

export const Button = ({ action, text, children }: ButtonProps) => {
  return (
    <>
      <StyledButtonOpacity onPress={action}>
        {text ? (
          // Send in props from button to text
          <Text>{text}</Text>
        ) : (
          React.Children.map(children, (child) =>
            React.cloneElement(child, {
              ...child.props,
              buttonChild: true,
            })
          )
        )}
      </StyledButtonOpacity>
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
