import React from 'react';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
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
import { UIColor } from '../themes/colors';

type SliderProps = {
  from: number;
  through: number;
  by?: number;
  value: number;
  onSlide: (n: number) => void;
};

export const Slider: React.FC<SliderProps> = ({
  from,
  through,
  by,
  value,
  onSlide,
}) => {
  const SLIDER_WIDTH = 300;
  const CIRCLE_WIDTH = 20;
  const midPoint = (through + from) / 2;
  const step = by || 1;

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

  const widthLeft = interpolate(translateX, {
    inputRange: [-SLIDER_WIDTH / 2, SLIDER_WIDTH / 2],
    outputRange: [0, SLIDER_WIDTH],
  });
  const widthRight = sub(SLIDER_WIDTH, widthLeft);

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
  }, []);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          flexDirection: 'row',
          width: SLIDER_WIDTH,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: UIColor.systemBlue,
            height: 2,
            width: widthLeft,
            borderRadius: 10,
          }}
        />
        <Animated.View
          style={{
            backgroundColor: UIColor.systemGray5,
            height: 2,
            width: widthRight,
            borderRadius: 10,
          }}
        />
        <Animated.View
          style={{
            position: 'absolute',
            left: SLIDER_WIDTH / 2 - CIRCLE_WIDTH / 2,
            top: -10,
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
      </Animated.View>
    </PanGestureHandler>
  );
};
