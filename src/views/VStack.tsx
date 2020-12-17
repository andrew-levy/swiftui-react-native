import React from 'react';
import styled from 'styled-components';
import { Fonts } from '../themes/fonts';
import { Alignment, Frame, Padding } from '../types/stylePropTypes';
import { getFrameFromProps } from '../styleProps/frame';
import { Spacer } from './Spacer';
import { UIColor } from '../themes/colors';

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
      background ? background || UIColor.white : UIColor.white
    };
    align-items: ${
      alignment
        ? Fonts.alignment[alignment] || Fonts.alignment.center
        : Fonts.alignment.center
    };
		justify-content: center;
		border-radius: ${cornerRadius || 0};
    padding: ${padding || 0};
    ${getFrameFromProps(frame)}
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
