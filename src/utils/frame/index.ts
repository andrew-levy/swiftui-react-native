export type Frame = {
  width?: number;
  height?: number;
};

export const getFrame = (frame: Frame) => {
  let styles = {};
  if (!frame) return styles;
  return { ...styles, ...frame };
};
