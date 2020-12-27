import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useCode,
  set,
  Value,
  add,
  call,
  floor,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { usePanGestureHandler } from 'react-native-redash/lib/module/v1';

import { ITEM_HEIGHT } from './Constants';
import { withDecay } from './AnimationHelpers';

interface GestureHandlerProps {
  value: Animated.Value<number>;
  max: number;
  onSelect: (n: number) => void;
  selection: number;
}

const GestureHandler = ({
  value,
  max,
  onSelect,
  selection,
}: GestureHandlerProps) => {
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const snapPoints = new Array(max).fill(0).map((_, i) => i * -ITEM_HEIGHT);
  const translateY = withDecay({
    value: translation.y,
    velocity: velocity.y,
    state,
    snapPoints,
    offset: new Value(0),
  });
  useCode(() => {
    return [
      set(value, add(translateY, ITEM_HEIGHT * 2)),
      call([value], ([value]) => {
        if (value % ITEM_HEIGHT === 0) {
          const newSelection =
            max - (value / ITEM_HEIGHT + Math.floor(max / 2)) - 1;
          onSelect(newSelection);
        }
      }),
    ];
  }, []);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};

export default GestureHandler;
