/*
 * Thank you @William Candillon for this awesome example found here:
 * https://github.com/wcandillon/can-it-be-done-in-react-native/tree/31496696939aa94094e8ec499b113facc4e94e56/the-10-min/src/Picker
 */

import Animated, {
  Clock,
  Value,
  add,
  block,
  cond,
  eq,
  set,
  startClock,
  and,
  not,
  clockRunning,
  timing,
  Easing,
  stopClock,
} from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';
import { snapPoint } from 'react-native-redash/lib/module/v1';

interface WithDecayParams {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Node<State>;
  offset: Animated.Value<number>;
  snapPoints: number[];
}

export const withDecay = (params: WithDecayParams) => {
  const { value, velocity, state: gestureState, offset, snapPoints } = {
    ...params,
  };
  const init = new Value(0);
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    duration: new Value(1000),
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  };
  return block([
    cond(not(init), [set(state.position, offset), set(init, 1)]),
    cond(eq(gestureState, State.BEGAN), set(offset, state.position)),
    cond(eq(gestureState, State.ACTIVE), [
      set(state.position, add(offset, value)),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(state.finished, 0),
      set(config.toValue, snapPoint(state.position, velocity, snapPoints)),
    ]),
    cond(and(not(state.finished), eq(gestureState, State.END)), [
      cond(not(clockRunning(clock)), [startClock(clock)]),
      timing(clock, state, config),
      cond(state.finished, stopClock(clock)),
    ]),
    state.position,
  ]);
};

export const clamp = (value: number, lowerBound: number, upperBound: number) =>
  Math.min(Math.max(lowerBound, value), upperBound);
