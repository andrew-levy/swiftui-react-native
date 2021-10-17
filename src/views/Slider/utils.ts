import { Dimensions } from 'react-native';
import { Frame } from '../../utils/frame';

const dimensions = Dimensions.get('window');

export const CIRCLE_WIDTH = 25;

export const getSliderWidth = (frame: Frame) => {
  let dims = [300, 3];
  if (!frame) return dims;
  if (frame.width) {
    if (typeof frame.width === 'string' && frame.width.endsWith('%')) {
      const percent = parseInt(frame.width.replace('%', '')) / 100;
      dims[0] = percent * dimensions.width;
    } else {
      dims[0] = frame.width as number;
    }
  }
  if (frame.height) {
    if (typeof frame.height === 'number') dims[1] = frame.height;
  }
};

export const value2Position = (
  value: number,
  midPoint: number,
  slope: number
) => {
  'worklet';
  return (value - midPoint) / slope;
};

export const position2Value = (
  pos: number,
  midPoint: number,
  slope: number,
  step: number
) => {
  'worklet';
  let newValue = Math.round((midPoint + pos * slope) / step) * step;
  if (!Number.isInteger(step))
    newValue = parseFloat(
      newValue.toFixed(step.toString().split('.')[1].length)
    );
  return newValue;
};
