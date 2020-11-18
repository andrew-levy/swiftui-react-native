import React from 'react';
import styled from 'styled-components';

type SpacerProps = {
  direction: 'veritcal' | 'horizontal';
  space: number;
};

const StyledSpacer = styled.View`
  ${({ direction, space }) =>
    direction
      ? direction === 'horizontal'
        ? `width: ${space || 10}`
        : `height: ${space || 10}`
      : `height: ${space || 10}`}
`;
export const Spacer: React.FC<SpacerProps> = ({ direction, space }) => {
  return <StyledSpacer direction={direction} space={space} />;
};

/* PROPS:
 * direction
 * space
 */
