import React from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';
import { Fonts } from '../themes/fonts';
import { Alignment, Padding } from '../types/stylePropTypes';
import { Spacer } from './Spacer';

type VStackProps = {
  background?: string;
  alignment?: Alignment;
  padding?: Padding;
  spacing?: number;
  children: React.ReactElement<any>;
};

const StyledVStack = styled.View`
  ${({ background, alignment, cornerRadius, padding }) => `
    flex: 1;
    background-color: ${
      background
        ? Colors.background[background] || Colors.background.white
        : Colors.background.white
    };
    align-items: ${
      alignment
        ? Fonts.alignment[alignment] || Fonts.alignment.center
        : Fonts.alignment.center
    };
		justify-content: center;
		border-radius: ${cornerRadius || 0};
		padding: ${padding || 0}
		width: 100%;
  `}
`;

export const VStack = (props: VStackProps) => {
  return (
    <StyledVStack {...props}>
      {props.spacing || props.spacing !== 0
        ? React.Children.map(props.children, (child) => (
            <>
              <Spacer space={props.spacing} />
              {child}
              <Spacer space={props.spacing} />
            </>
          ))
        : props.children}
    </StyledVStack>
  );
};
