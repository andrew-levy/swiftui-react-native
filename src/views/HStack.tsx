import React from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';

type HStackProps = { backgroundColor?: string };

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

export const HStack: React.FC<HStackProps> = ({
  backgroundColor,
  children,
}) => {
  return (
    <StyledHStack backgroundColor={backgroundColor}>{children}</StyledHStack>
  );
};
