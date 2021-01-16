import React from 'react';
import styled from 'styled-components';

type SpacerProps = {
  direction?: 'vertical' | 'horizontal';
  space?: number;
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

// Ideal behavior: spacer fills the remaining space of the parent container
// Would need to know the placement of each child component as well as the widths/heights of each
// That would be hard. This ^ will do for now.

// const [y, setY] = useState(0);
// const [fillSpace, setFillSpace] = useState(0);
// const { width, height } = Dimensions.get('screen');
// return (
//   <View
//     style={{ height: space || height - y }}
//     onLayout={(e) => setY(e.nativeEvent.layout.y)}
//   />

// );
