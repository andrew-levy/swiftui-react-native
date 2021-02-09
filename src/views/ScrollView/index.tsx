import React, { useContext } from 'react';
import { Animated } from 'react-native';
import { UIColor } from '../../themes/colors';
import { HeaderScrollContext } from '../NavigationViewManager';

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
  const scrollY = useContext(HeaderScrollContext);
  return (
    <Animated.ScrollView
      horizontal={direction === 'horizontal'}
      scrollEventThrottle={1}
      showsVerticalScrollIndicator={showIndicators}
      showsHorizontalScrollIndicator={showIndicators}
      onScroll={
        scrollY
          ? Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              {
                useNativeDriver: true,
              }
            )
          : null
      }
      style={{ backgroundColor: background }}
    >
      {children}
    </Animated.ScrollView>
  );
};
