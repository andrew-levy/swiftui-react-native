export type Frame = {
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
};

export type ShapeFrame =
  | { width: number; height: number }
  | { width: number }
  | { height: number };

export const getFrame = (frame: Frame) => {
  let styles = {};
  if (!frame) return styles;

  // Case: maxHeight: 'infinity'
  if (frame.maxHeight === 'infinity') {
    styles = { ...styles, flex: 1 };
    delete frame.maxHeight;
  }

  return { ...styles, ...frame };
};
