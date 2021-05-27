import { Shadow } from '../../types/propTypes';

export const getShadow = (shadow: Shadow) => {
  if (!shadow) return null;
  return {
    ...(shadow.color && { shadowColor: shadow.color }),
    ...(shadow.radius && { shadowRadius: shadow.radius }),
    ...(shadow.x &&
      shadow.y && { shadowOffset: { width: shadow.x, height: shadow.y } }),
  };
};
