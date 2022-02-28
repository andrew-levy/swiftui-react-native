import { UIColor } from '../utils/colors';
import { ColorSchemeOptions } from '../views/ColorSchemeProvider/ColorSchemeProvider';
import { useColorScheme } from './useColorScheme';

/**
 * A hook that returns the appropriate color palette based on the color scheme.
 */
export const useUIColor = (preferredColorScheme?: ColorSchemeOptions) => {
  if (preferredColorScheme) return UIColor[preferredColorScheme];

  const colorScheme = useColorScheme();
  return colorScheme === 'light' ? UIColor.light : UIColor.dark;
};
