import React from 'react';
import styled from 'styled-components';
import { Fonts } from '../themes/fonts';
import { HorizontalAlignment, Frame, Padding } from '../types/stylePropTypes';
import { getFrameFromProps } from '../styleProps/frame';
import { Spacer } from './Spacer';
import { UIColor } from '../themes/colors';

type HStackProps = {
  background?: string;
  alignment?: HorizontalAlignment;
  padding?: Padding;
  spacing?: number | 'stretch';
  fillSpace?: 'left' | 'right';
  width?: number;
  frame?: Frame;
  cornerRadius?: number;
  children: React.ReactElement<any> | React.ReactElement<any>[];
};

const StyledHStack = styled.View`
  ${({
    background,
    alignment,
    cornerRadius,
    padding,
    frame,
    spacing,
    fillSpace,
  }) => `
    flex-direction: row;
    background-color: ${
      background ? background || UIColor.white : UIColor.white
    };
    align-items: ${
      alignment
        ? Fonts.verticalAlignment[alignment] || Fonts.verticalAlignment.center
        : Fonts.verticalAlignment.center
    };
    justify-content: ${
      fillSpace
        ? fillSpace === 'left'
          ? 'flex-end'
          : 'flex-start'
        : spacing === 'stretch'
        ? 'space-between'
        : 'center'
    };
    border-radius: ${cornerRadius || 0}px;
    padding: ${padding || 0}px;
    ${getFrameFromProps(frame)}
`}
`;

export const HStack: React.FC<HStackProps> = (props) => {
  const spacer =
    props.spacing && typeof props.spacing === 'number' ? (
      <Spacer direction='horizontal' space={props.spacing} />
    ) : null;
  return (
    <StyledHStack {...props}>
      {props.spacing && props.spacing !== 0
        ? React.Children.map(props.children, (child) => (
            <>
              {spacer}
              {child}
              {spacer}
            </>
          ))
        : props.children}
    </StyledHStack>
  );
};
