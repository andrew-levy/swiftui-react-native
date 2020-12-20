import React, { useContext } from 'react';
import { Animated } from 'react-native';
import { HeaderScrollContext } from './NavigationViewManager';

type ScrollViewProps = {
  direction?: 'vertical' | 'horizontal';
};

export const ScrollView: React.FC<ScrollViewProps> = ({
  children,
  direction,
}) => {
  const scrollY = useContext(HeaderScrollContext);
  return (
    <Animated.ScrollView
      horizontal={direction === 'horizontal'}
      scrollEventThrottle={1}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
          useNativeDriver: true,
        }
      )}
    >
      {children}
    </Animated.ScrollView>
  );
};
