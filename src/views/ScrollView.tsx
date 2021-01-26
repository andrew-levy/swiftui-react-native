import React, { useContext } from 'react';
import { Animated } from 'react-native';
import { HeaderScrollContext } from './Navigation/NavigationViewManager';

type ScrollViewProps = {
  direction?: 'vertical' | 'horizontal';
  background?: string;
};

export const ScrollView: React.FC<ScrollViewProps> = ({
  children,
  direction,
  background,
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
      style={{ backgroundColor: background || 'white' }}
    >
      {children}
    </Animated.ScrollView>
  );
};
