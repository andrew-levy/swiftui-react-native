import React from 'react';
import styled from 'styled-components';
import { Fonts } from '../themes/fonts';
import { Alignment, Frame, Padding } from '../types/stylePropTypes';
import { getFrameFromProps } from '../styleProps/frame';
import { Spacer } from './Spacer';
import { UIColor } from '../themes/colors';

type HStackProps = {
  background?: string;
  alignment?: Alignment;
  padding?: Padding;
  spacing?: number;
  width?: number;
  frame?: Frame;
  cornerRadius?: number;
  children: React.ReactElement<any> | React.ReactElement<any>[];
};

const StyledHStack = styled.View`
  ${({ background, alignment, cornerRadius, padding, frame, width }) => `
    flex-direction: row;
    background-color: ${
      background ? background || UIColor.white : UIColor.white
    };
    align-items: ${
      alignment
        ? Fonts.alignment[alignment] || Fonts.alignment.center
        : Fonts.alignment.center
    };
    justify-content: space-between;
    border-radius: ${cornerRadius || 0};
    padding: ${padding || 0};
    ${getFrameFromProps(frame)}
`}
`;

export const HStack: React.FC<HStackProps> = (props) => {
  return (
    <StyledHStack {...props}>
      {props.spacing && props.spacing !== 0
        ? React.Children.map(props.children, (child) => (
            <>
              <Spacer direction='horizontal' space={props.spacing} />
              {child}
              <Spacer direction='horizontal' space={props.spacing} />
            </>
          ))
        : props.children}
    </StyledHStack>
  );
};
