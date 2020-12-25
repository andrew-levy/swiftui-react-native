import React from 'react';
import styled from 'styled-components';
import { UIColor } from '../themes/colors';
import { Fonts } from '../themes/fonts';
import { Alignment, Padding, Shadow } from '../types/stylePropTypes';
import { Text } from './Text';

export type ButtonProps = {
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
  alignment?: Alignment;
};

const StyledButtonOpacity = styled.TouchableOpacity`
  background-color: ${({ background }) =>
    background ? background || UIColor.white : UIColor.white};
  align-items: ${({ alignment }) =>
    alignment
      ? Fonts.alignment[alignment] || Fonts.alignment.center
      : Fonts.alignment.center};
  justify-content: center;
  border-radius: ${({ cornerRadius }) => cornerRadius || 0};
  padding: ${({ padding }) => padding || 0}
  width: ${({ width }) => width || '100'}%;
`;

export const Button = ({ action, text, children, ...props }: ButtonProps) => {
  return (
    <>
      <StyledButtonOpacity onPress={action} {...props}>
        {text ? (
          // Send in props from button to text
          <Text>{text}</Text>
        ) : (
          React.Children.map(children, (child) =>
            React.cloneElement(child, {
              ...child.props,
              ...{ buttonChild: true },
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
