import React from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { useColorScheme } from '../../hooks/useColorScheme';
import { systemColor, UIColor } from '../../utils/colors';

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
  const { colorScheme } = useColorScheme();
  return (
    <RNScrollView
      horizontal={direction === 'horizontal'}
      scrollEventThrottle={1}
      showsVerticalScrollIndicator={showIndicators}
      showsHorizontalScrollIndicator={showIndicators}
      style={{ backgroundColor: systemColor(background, colorScheme) }}
    >
      {children}
    </RNScrollView>
  );
};
