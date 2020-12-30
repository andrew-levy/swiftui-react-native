import React from 'react';
import { Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useValue } from 'react-native-reanimated';
import { withSpring, onGestureEvent } from 'react-native-redash/lib/module/v1';
import { UIColor } from '../themes/colors';

type BottomSheetProps = {};

export const BottomSheet: React.FC<BottomSheetProps> = ({ children }) => {
  const { width, height } = Dimensions.get('window');
  const peakingHeight = 40;
  const translationY = useValue(0);
  const velocityY = useValue(0);
  const state = useValue(State.UNDETERMINED);
  const offset = useValue(0);

  const config = {
    damping: 35,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 0.1,
    restDisplacementThreshold: 0.1,
  };

  const gestureHandler = onGestureEvent({
    state,
    translationY,
    velocityY,
  });

  const translateY = withSpring({
    value: translationY,
    velocity: velocityY,
    offset,
    state,
    snapPoints: [
      height / 4,
      height / 2 + peakingHeight,
      height - peakingHeight,
    ],
    config,
  });

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: peakingHeight,
          height: height,
          width: width,
          backgroundColor: UIColor.white,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          transform: [{ translateY }],
        }}
      >
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};
