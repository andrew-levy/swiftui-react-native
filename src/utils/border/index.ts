import { UIColor } from '../colors';

export type Border = {
  color?: UIColor;
  width?: number;
};

export const getBorder = (border: Border, colorScheme: 'light' | 'dark') => {
  if (!border) return null;
  return {
    ...(border.color && {
      borderColor: UIColor[colorScheme][border.color] || border.color,
    }),
    ...(border.width && { borderWidth: border.width }),
  };
};
