import React from 'react';
import { StyleSheet } from 'react-native';
import { State } from 'react-native-gesture-handler';
import Animated, {
  add,
  call,
  cond,
  divide,
  eq,
  interpolate,
  not,
  set,
  sub,
  useCode,
  useValue,
} from 'react-native-reanimated';
import { clamp, onGestureEvent } from 'react-native-redash/lib/module/v1';
import { useColorScheme } from '../../hooks/useColorScheme';
import { systemColor, UIColor } from '../../utils/colors';
import { CIRCLE_WIDTH, SLIDER_HEIGHT, SLIDER_WIDTH } from './Constants';
import { Cursor } from './Cursor';
import { FillBar } from './FillBar';

type SliderProps = {
  color?: string;
  step?: number;
  range?: [number, number];
  value: number;
  onSlide: (n: number) => void;
};

export const Slider: React.FC<SliderProps> = ({
  color = UIColor.systemBlue,
  range = [0, 10],
  step = 1,
  value,
  onSlide,
}) => {
  const { colorScheme } = useColorScheme();
  const [from, through] = range;
  const midPoint = (through + from) / 2;

  const translationX = useValue(0);
  const velocityX = useValue(0);
  const state = useValue(State.UNDETERMINED);
  const offset = useValue(0);
  const start = useValue(0);
  const dragging = useValue(0);
  const position = useValue(0);
  const init = useValue(0);
  const valueVal = useValue(value);
  const midpointVal = useValue(midPoint);
  const fromVal = useValue(from);
  const sliderWidthVal = useValue(SLIDER_WIDTH);

  const gestureHandler = onGestureEvent({
    state,
    translationX,
    velocityX,
    offset,
  });

  const translateX = clamp(
    [
      cond(not(init), [
        set(
          position,
          divide(
            sub(valueVal, midpointVal),
            divide(sub(midpointVal, fromVal), divide(sliderWidthVal, 2))
          )
        ),
        set(init, 1),
      ]),
      cond(
        eq(state, State.ACTIVE),
        [
          cond(eq(dragging, 0), [set(dragging, 1), set(start, position)]),
          set(position, add(start, translationX)),
        ],
        [set(dragging, 0), position]
      ),
    ],
    -SLIDER_WIDTH / 2,
    SLIDER_WIDTH / 2
  );

  const fillWidth = interpolate(translateX, {
    inputRange: [-SLIDER_WIDTH / 2, SLIDER_WIDTH / 2],
    outputRange: [0, SLIDER_WIDTH],
  });

  useCode(() => {
    return call([translateX], (translateX) => {
      const slope = (midPoint - from) / (SLIDER_WIDTH / 2);
      let newValue =
        Math.round((midPoint + translateX[0] * slope) / step) * step;
      if (!Number.isInteger(step))
        newValue = parseFloat(
          newValue.toFixed(step.toString().split('.')[1].length)
        );
      onSlide(newValue);
    });
  }, [translateX]);

  return (
    <Animated.View
      style={[
        styles.slider,
        {
          width: SLIDER_WIDTH,
          height: SLIDER_HEIGHT,
          marginTop: CIRCLE_WIDTH / 2,
          marginBottom: CIRCLE_WIDTH / 2,
          backgroundColor: systemColor(UIColor.systemGray5, colorScheme),
        },
      ]}
    >
      <FillBar fillWidth={fillWidth} color={color} />
      <Cursor translateX={translateX} gestureHandler={gestureHandler} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  slider: {
    flexDirection: 'row',
    borderRadius: 10,
  },
});
