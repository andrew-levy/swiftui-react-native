import React from 'react';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  add,
  call,
  cond,
  divide,
  eq,
  greaterOrEq,
  interpolate,
  set,
  sub,
  useCode,
  useValue,
} from 'react-native-reanimated';
import { usePanGestureHandler, clamp } from 'react-native-redash/lib/module/v1';
import { UIColor } from '../themes/colors';

type SliderProps = {
  from: number;
  through: number;
  by: number;
  value: number;
  onSlide: (number) => void;
};

export const Slider: React.FC<SliderProps> = ({
  from,
  through,
  by,
  value,
  onSlide,
}) => {
  const SLIDER_WIDTH = 300;
  const partition = (through - from) / by;
  const step = SLIDER_WIDTH / partition;

  const { gestureHandler, translation, state } = usePanGestureHandler();
  const translateX = clamp(
    withSlide(translation.x, state),
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
      const newValue = value + translateX[0];
      console.log(newValue);
      // onSlide(newValue);
    });
  }, []);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={{ flexDirection: 'row', width: SLIDER_WIDTH }}>
        <Animated.View
          style={{
            backgroundColor: UIColor.systemBlue,
            height: 2,
            width: widthLeft,
          }}
        />
        <Animated.View
          style={{
            backgroundColor: UIColor.systemGray5,
            height: 2,
            width: widthRight,
          }}
        />
        <Animated.View
          style={{
            position: 'absolute',
            left: SLIDER_WIDTH / 2,
            top: -10,
            height: 20,
            width: 20,
            borderRadius: 100,
            backgroundColor: UIColor.white,
            shadowColor: '#000',
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

const withSlide = (translation: Animated.Value<number>, state: State) => {
  const start = useValue(0);
  const dragging = useValue(0);
  const position = useValue(0);

  return cond(
    eq(state, State.ACTIVE),
    [
      cond(eq(dragging, 0), [set(dragging, 1), set(start, position)]),
      set(position, add(start, translation)),
    ],
    [set(dragging, 0), position]
  );
};
