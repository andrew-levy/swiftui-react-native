import { UIColor } from '../colors';

export type Shadow = {
  color?: UIColor;
  x?: number;
  y?: number;
  radius?: number;
  opacity?: number;
};

export const getShadow = (shadow: Shadow, colorScheme: 'light' | 'dark') => {
  if (!shadow) return null;
  return {
    ...(shadow.color && {
      shadowColor: UIColor[colorScheme][shadow.color] || shadow.color,
    }),
    ...(shadow.radius && { shadowRadius: shadow.radius }),
    ...(shadow.x &&
      shadow.y && { shadowOffset: { width: shadow.x, height: shadow.y } }),
  };
};
