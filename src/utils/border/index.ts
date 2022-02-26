import type { UIColor } from '../colors';

export type Border = {
  color?: UIColor;
  width?: number;
};

export const getBorder = (border: Border) => {
  if (!border) return null;
  return {
    ...(border.color && { borderColor: border.color }),
    ...(border.width && { borderWidth: border.width }),
  };
};
