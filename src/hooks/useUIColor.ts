import { UIColor } from '../utils/colors';
import { useColorScheme } from './useColorScheme';

/**
 * A hook that returns the appropriate color palette based on the color scheme.
 */
export const useUIColor = () => {
  const { colorScheme } = useColorScheme();
  return colorScheme === 'light' ? UIColor.light : UIColor.dark;
};
