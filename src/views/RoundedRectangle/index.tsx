import React from 'react';
import styled from 'styled-components';
import { UIColor } from '../../themes/colors';
import { Frame } from '../../types/stylePropTypes';

type RoundedRectangleProps = {
  fill: string;
  frame: Frame;
  cornerRadius?: number;
};

const StyledRoundedRectangle = styled.View`
  background-color: ${({ fill }) => fill};
  width: ${({ frame }) => (frame && frame.width ? frame.width : 20)}px;
  height: ${({ frame }) => (frame && frame.height ? frame.height : 20)}px;
  border-color: ${UIColor.systemGray5};
  border-radius: ${({ cornerRadius }) => cornerRadius || 3}px;
  border-width: 0.5px;
`;

export const RoundedRectangle: React.FC<RoundedRectangleProps> = ({
  fill,
  frame,
  cornerRadius,
}) => {
  return (
    <StyledRoundedRectangle
      fill={fill}
      frame={frame}
      cornerRadius={cornerRadius}
    />
  );
};
