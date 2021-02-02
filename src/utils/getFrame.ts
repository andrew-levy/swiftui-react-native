import { Frame } from '../types/stylePropTypes';

export const getFrame = (frame: Frame) => {
  const defaultStyles = { width: '100%' };
  let styles = {};
  if (!frame) return defaultStyles;

  // Case: maxHeight: 'infinity'
  if (frame.maxHeight === 'infinity') {
    styles = { ...styles, flex: 1 };
    delete frame.maxHeight;
  }

  // Case: add width: '100%' if not included in frame
  if (!Object.keys(frame).includes('width')) {
    styles = { ...styles, ...defaultStyles };
  }

  return { ...styles, ...frame };
};
