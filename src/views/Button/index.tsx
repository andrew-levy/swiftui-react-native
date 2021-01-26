import React from 'react';
import styled from 'styled-components';
import { UIColor } from '../../themes/colors';
import { Fonts } from '../../themes/fonts';
import {
  VerticalAlignment,
  HorizontalAlignment,
  Padding,
  Shadow,
} from '../../types/stylePropTypes';
import { Text } from '../Text';

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
  alignment?: HorizontalAlignment | VerticalAlignment;
};

const StyledButtonOpacity = styled.TouchableOpacity`
  background-color: ${({ background }) =>
    background ? background || UIColor.white : UIColor.white};
  align-items: ${({ alignment }) =>
    alignment
      ? Fonts.horizontalAlignment[alignment] || Fonts.horizontalAlignment.center
      : Fonts.horizontalAlignment.center};
  justify-content: center;
  border-radius: ${({ cornerRadius }) => cornerRadius || 0}px;
  padding: ${({ padding }) => padding || 0}px;
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
