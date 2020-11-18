import React from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';
import { Fonts } from '../themes/fonts';

type VStackProps = {
  backgroundColor?: string;
  alignment?: string;
};

const StyledVStack = styled.View`
  ${({ backgroundColor, alignment }) => `
    flex: 1;
    background-color: ${
      backgroundColor
        ? Colors.background[backgroundColor] || Colors.background.white
        : Colors.background.white
    };
    align-items: ${
      alignment
        ? Fonts.alignment[alignment] || Fonts.alignment.center
        : Fonts.alignment.center
    };
    justify-content: center;
  `}
`;

export const VStack: React.FC<VStackProps> = (props) => {
  return <StyledVStack {...props}>{props.children}</StyledVStack>;
};
