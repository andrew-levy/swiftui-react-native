import { Colors } from '../themes/colors';
import { Shadow } from '../types/stylePropTypes';

export const getShadowFromProps = (shadowProps: Shadow) => {
  if (shadowProps) {
    return `border-radius: ${shadowProps.x}px ${shadowProps.y}px ${
      shadowProps.radius
    }px ${Colors.background[shadowProps.color] || Colors.background.black}`;
  }
  return null;
};
