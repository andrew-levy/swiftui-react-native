import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  add,
  call,
  clockRunning,
  cond,
  eq,
  interpolate,
  not,
  set,
  useCode,
  useValue,
} from 'react-native-reanimated';
import {
  snapPoint,
  timing,
  clamp,
  useClock,
  usePanGestureHandler,
  minus,
} from 'react-native-redash/lib/module/v1';
import { UIColor } from '../../themes/colors';

type SwipeableItemProps = {
  onDelete: (i: number) => void;
  index: number;
};

const { width } = Dimensions.get('window');
const snapPoints = [-width, -100, 0];
const HEIGHT = 50;

export const SwipeableItem: React.FC<SwipeableItemProps> = ({
  onDelete,
  index,
  children,
}) => {
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const translateX = useValue(0);
  const offsetX = useValue(0);
  const height = useValue(HEIGHT);
  const clock = useClock();
  const to = snapPoint(translateX, velocity.x, snapPoints);
  const shouldRemove = useValue<0 | 1>(0);

  const translateText = clamp(
    interpolate(translateX, {
      inputRange: [-100, 0],
      outputRange: [0, 100],
    }),
    0,
    100
  );
  const textOpacity = interpolate(height, {
    inputRange: [0, HEIGHT],
    outputRange: [0, 1],
  });
  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        set(
          translateX,
          add(offsetX, clamp(translation.x, -9999, minus(offsetX)))
        )
      ),
      cond(eq(state, State.END), [
        set(translateX, timing({ clock, from: translateX, to })),
        set(offsetX, translateX),
        cond(eq(to, -width), set(shouldRemove, 1)),
      ]),
      cond(shouldRemove, [
        set(height, timing({ from: HEIGHT, to: 0 })),
        cond(
          not(clockRunning(clock)),
          call([], () => onDelete(index))
        ),
      ]),
    ],
    []
  );

  return (
    <Animated.View style={{ backgroundColor: UIColor.systemRed }}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            zIndex: -1,
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginRight: 20,
            transform: [{ translateX: translateText }],
          },
        ]}
      >
        <TouchableOpacity onPress={() => shouldRemove.setValue(1)}>
          <Animated.Text style={{ color: UIColor.white, opacity: textOpacity }}>
            Delete
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={{ height, transform: [{ translateX }] }}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
