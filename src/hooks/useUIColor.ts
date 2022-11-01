import { UIColor } from '../utils/colors';
import { useColorScheme } from './useColorScheme';

/**
 * A hook that returns the appropriate color palette based on the color scheme.
 */
export const useUIColor = (preferredColorScheme?: 'light' | 'dark') => {
  const colorScheme = useColorScheme(preferredColorScheme);
  return UIColor[colorScheme];
};
