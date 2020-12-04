import React from 'react';
import styled from 'styled-components';

type SpacerProps = {
  direction?: 'veritcal' | 'horizontal';
  space: number;
};

const StyledSpacer = styled.View`
  ${({ direction, space }) =>
    direction
      ? direction === 'horizontal'
        ? `width: ${space || 10}px;`
        : `height: ${space || 10}px;`
      : `height: ${space || 10}px;`}
`;
export const Spacer: React.FC<SpacerProps> = ({ direction, space }) => {
  return <StyledSpacer direction={direction} space={space} />;
};

// TODO: Use context from the H/V Stacks to automatically choose direction.
// const directionFromStack = useContext(SpacerDirectionContext);
// ...
// <StyledSpacer direction={direction || directionFromStack || 'vertical'} space={space} />
