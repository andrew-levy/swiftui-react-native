/*
 * Thank you @William Candillon for this awesome example found here:
 * https://github.com/wcandillon/can-it-be-done-in-react-native/tree/31496696939aa94094e8ec499b113facc4e94e56/the-10-min/src/Picker
 */

import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useCode,
  set,
  Value,
  add,
  call,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { usePanGestureHandler } from "react-native-redash/lib/module/v1";

import { WHEEL_ITEM_HEIGHT } from "../Constants";
import { withDecay } from "../AnimationHelpers";

type GestureHandlerProps = {
  value: Animated.Value<number>;
  max: number;
  onSelect: (n: number) => void;
  selection: number;
};

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
  const snapPoints = new Array(max)
    .fill(0)
    .map((_, i) => i * -WHEEL_ITEM_HEIGHT);
  const translateY = withDecay({
    value: translation.y,
    velocity: velocity.y,
    state,
    snapPoints,
    offset: new Value(selection * -WHEEL_ITEM_HEIGHT),
  });
  useCode(() => {
    return [
      set(value, add(translateY, WHEEL_ITEM_HEIGHT * 2)),
      call([value], ([value]) => {
        if (value % WHEEL_ITEM_HEIGHT === 0) {
          // Haptic feedback goes here
          const midPoint = Math.floor(max / 2);
          const newSelection = max - (value / WHEEL_ITEM_HEIGHT + midPoint) - 1;
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
