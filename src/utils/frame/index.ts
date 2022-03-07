export type Frame = {
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  maxWidth?: number | `${number}%` | 'infinity';
  maxHeight?: number | `${number}%` | 'infinity';
  minWidth?: number | `${number}%`;
  minHeight?: number | `${number}%`;
};

export type ShapeFrame =
  | { width: number; height: number }
  | { width: number }
  | { height: number };

export const getFrame = (frame: Frame) => {
  let styles = {};
  if (!frame) return styles;

  if (frame.maxHeight === 'infinity') {
    styles = { ...styles, flex: 1 };
    delete frame.maxHeight;
  }
  if (frame.maxWidth === 'infinity') {
    styles = { ...styles, width: '100%' };
    delete frame.maxWidth;
  }

  return { ...styles, ...frame };
};
