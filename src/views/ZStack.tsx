import React from 'react';
import styled from 'styled-components';
import { Fonts } from '../themes/fonts';
import { Alignment, Frame, Padding } from '../types/stylePropTypes';
import { getFlexFromProps } from '../styleProps/frame';
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
