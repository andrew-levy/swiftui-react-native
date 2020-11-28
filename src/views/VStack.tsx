import React from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';
import { Fonts } from '../themes/fonts';
import { Alignment, Frame, Padding } from '../types/stylePropTypes';
import { getFlexFromProps } from '../styleProps/frame';
import { Spacer } from './Spacer';

type VStackProps = {
  background?: string;
  alignment?: Alignment;
  padding?: Padding;
  spacing?: number;
  width?: number;
  frame?: Frame;
  cornerRadius?: number;
  children: React.ReactElement<any> | React.ReactElement<any>[];
};

const StyledVStack = styled.View`
  ${({ background, alignment, cornerRadius, padding, frame, width }) => `
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
    ${getFlexFromProps(frame)}
  `}
`;

export const VStack = (props: VStackProps) => {
  return (
    <StyledVStack {...props}>
      {props.spacing && props.spacing !== 0
        ? React.Children.map(props.children, (child) => (
            <>
              <Spacer space={props.spacing} />
              {child}
              <Spacer space={props.spacing} />
            </>
          ))
        : props.children}
    </StyledVStack>
  );
};

// Need to fix issue with flex: 1;
