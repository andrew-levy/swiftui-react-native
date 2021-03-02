import React from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { UIColor } from '../../themes/colors';

type ScrollViewProps = {
  direction?: 'vertical' | 'horizontal';
  background?: string;
  showIndicators?: boolean;
};

export const ScrollView: React.FC<ScrollViewProps> = ({
  children,
  direction = 'vertical',
  background = UIColor.transparent,
  showIndicators = true,
}) => {
  return (
    <RNScrollView
      horizontal={direction === 'horizontal'}
      scrollEventThrottle={1}
      showsVerticalScrollIndicator={showIndicators}
      showsHorizontalScrollIndicator={showIndicators}
      style={{ backgroundColor: background }}
    >
      {children}
    </RNScrollView>
  );
};
