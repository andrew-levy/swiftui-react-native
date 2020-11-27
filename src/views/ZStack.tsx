import React from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';
import { Fonts } from '../themes/fonts';
import { Alignment, Frame, Padding } from '../types/stylePropTypes';
import { getFlexFromProps } from '../utils/frame';

type ZStackProps = {
  background?: string;
  alignment?: Alignment;
  padding?: Padding;
  spacing?: number;
  width?: number;
  frame?: Frame;
  cornerRadius?: number;
  children: React.ReactElement<any> | React.ReactElement<any>[];
};

const StyledZStack = styled.View`
  ${({ background, alignment, cornerRadius, padding, frame, width }) => `
    background-color: ${
      background
        ? Colors.background[background] || Colors.background.white
        : Colors.background.white
    };
		justify-content: center;
		border-radius: ${cornerRadius || 0};
		padding: ${padding || 0}
    width: ${width || '100'}%;
    ${getFlexFromProps(frame)}
  `}
`;

export const ZStack = (props: ZStackProps) => {
  return (
    <StyledZStack {...props}>
      {props.spacing && props.spacing !== 0
        ? React.Children.map(props.children, (child, i) =>
            React.cloneElement(child, { zIndex: i })
          )
        : props.children}
    </StyledZStack>
  );
};
