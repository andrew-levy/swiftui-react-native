import { Modifiers, getSizeFromModifiers } from '../modifiers';

export const getFrame = (frame: Modifiers['frame']) => {
  let styles = {};
  if (!frame) return styles;
  return getSizeFromModifiers({ frame });
};
