import { Frame } from '../types/stylePropTypes';

// TODO: cover all cases
export const getFlexFromProps = (frame: Frame) => {
  if (frame) {
    let styles = '';
    Object.keys(frame).forEach((key) => {
      if (typeof frame[key] === 'number') styles += `${key}: ${frame[key]}`;
      else if (typeof frame[key] === 'string')
        styles += frame[key] === 'infinity' ? 'flex: 1;' : '';
    });
    return styles;
  }
  return null;
};
