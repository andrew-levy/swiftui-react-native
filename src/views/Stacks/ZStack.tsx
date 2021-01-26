import React from 'react';
import styled from 'styled-components';
import {
  VerticalAlignment,
  HorizontalAlignment,
  Frame,
  Padding,
} from '../../types/stylePropTypes';
import { getFrameFromProps } from '../../styleProps/frame';
import { UIColor } from '../../themes/colors';

type ZStackProps = {
  background?: string;
  alignment?: HorizontalAlignment | VerticalAlignment;
  padding?: Padding;
  spacing?: number;
  width?: number;
  frame?: Frame;
  cornerRadius?: number;
  children: React.ReactElement<any> | React.ReactElement<any>[];
};

const StyledZStack = styled.View`
  ${({ background, alignment, cornerRadius, padding, frame }) => `
    background-color: ${
      background ? background || UIColor.white : UIColor.white
    };
		justify-content: center;
		border-radius: ${cornerRadius || 0}px;
		padding: ${padding || 0}px;
    ${getFrameFromProps(frame)}
  `}
`;

export const ZStack = (props: ZStackProps) => {
  return (
    <StyledZStack {...props}>
      {React.Children.map(props.children, (child, i) =>
        React.cloneElement(child, {
          style: { zIndex: i, position: 'absolute' },
        })
      )}
    </StyledZStack>
  );
};
