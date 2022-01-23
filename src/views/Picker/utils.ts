import { withTiming } from 'react-native-reanimated';

export type GestureHandlerContext = {
  offsetX: number;
};

export const selectedToPosition = (
  selected: number,
  width: number,
  childCount: number
) => {
  'worklet';
  return (selected * width) / childCount;
};
export const positionToSelected = (
  position: number,
  width: number,
  childCount: number
) => {
  'worklet';
  return Math.round((position * childCount) / width);
};

export const snapToClosest = (position: number, points: number[]) => {
  'worklet';
  const deltas = points.map((p) => Math.abs(position - p));
  const minDelta = Math.min.apply(null, deltas);
  return withTiming(
    points.filter((p) => Math.abs(position - p) === minDelta)[0]
  );
};

export const clamp = (
  value: number,
  lowerBound: number,
  upperBound: number
) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};
