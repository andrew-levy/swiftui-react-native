import React from 'react';
import styled from 'styled-components';
import { Alignment, Frame, Padding } from '../types/stylePropTypes';
import { getFrameFromProps } from '../styleProps/frame';
import { UIColor } from '../themes/colors';

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
      background ? background || UIColor.white : UIColor.white
    };
		justify-content: center;
		border-radius: ${cornerRadius || 0};
		padding: ${padding || 0};
    ${getFrameFromProps(frame)}
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
