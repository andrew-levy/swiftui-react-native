import React from 'react';
import { View } from 'react-native';

type SpacerProps = {
  direction?: 'vertical' | 'horizontal';
  space?: number;
};

export const Spacer: React.FC<SpacerProps> = ({
  direction = 'vertical',
  space = 10,
}) => {
  return (
    <View
      style={{
        ...(direction === 'vertical' ? { height: space } : { width: space }),
      }}
    />
  );
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
