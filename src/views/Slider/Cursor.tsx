import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { UIColor } from '../../themes/colors';
import { CIRCLE_WIDTH, SLIDER_WIDTH } from './Constants';

type CursorProps = {
  translateX: Animated.Value<number>;
  gestureHandler: {
    onHandlerStateChange: () => void;
    onGestureEvent: () => void;
  };
};

export const Cursor: React.FC<CursorProps> = ({
  translateX,
  gestureHandler,
}) => {
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          position: 'absolute',
          left: SLIDER_WIDTH / 2 - CIRCLE_WIDTH / 2,
          top: -CIRCLE_WIDTH / 2,
          height: CIRCLE_WIDTH,
          width: CIRCLE_WIDTH,
          borderRadius: 100,
          backgroundColor: UIColor.white,
          shadowColor: UIColor.black,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          transform: [{ translateX }],
        }}
      />
    </PanGestureHandler>
  );
};
