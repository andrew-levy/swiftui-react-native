import React from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';

type HStackProps = { background?: string };

const StyledHStack = styled.View`
  ${({ background }) => `
    flex: 1;
    flex-direction: row;
    background-color: ${
      background
        ? Colors.background[background] || Colors.background.white
        : Colors.background.white
    };
    align-items: center;
    justify-content: center;
  `}
`;

export const HStack: React.FC<HStackProps> = ({ background, children }) => {
  return <StyledHStack background={background}>{children}</StyledHStack>;
};
