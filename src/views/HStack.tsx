import React from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';

type HStackProps = {};

const StyledHStack = styled.View`
  ${({ backgroundColor }) => `
    flex: 1;
    flex-direction: row;
    background-color: ${
      backgroundColor
        ? Colors.background[backgroundColor] || Colors.background.white
        : Colors.background.white
    };
    align-items: center;
    justify-content: center;
  `}
`;

export const HStack: React.FC<HStackProps> = ({ children }) => {
  return <StyledHStack>{children}</StyledHStack>;
};
