import React from 'react';
import styled from 'styled-components';
import { UIColor } from '../themes/colors';
import { Frame } from '../types/stylePropTypes';

type RoundedRectangleProps = {
  fill: string;
  frame: Frame;
};

const StyledRoundedRectangle = styled.View`
  background-color: ${({ fill }) => fill};
  width: ${({ frame }) => (frame && frame.width ? frame.width : 20)};
  height: ${({ frame }) => (frame && frame.height ? frame.height : 20)};
  border-color: ${UIColor.systemGray5};
  border-radius: 3px;
  border-width: 0.5px;
`;

export const RoundedRectangle: React.FC<RoundedRectangleProps> = ({
  fill,
  frame,
}) => {
  return <StyledRoundedRectangle fill={fill} frame={frame} />;
};
