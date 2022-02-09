import { useContext } from 'react';
import {
  ColorSchemeContext,
  ColorSchemeContextType,
  ColorSchemeOptions,
} from '../views/ColorSchemeProvider/ColorSchemeProvider';

const defaultScheme: ColorSchemeContextType = {
  colorScheme: 'light',
  setColorScheme: (colorScheme: ColorSchemeOptions) => {
    console.warn(
      'No ColorSchemeProvider found. You need to wrap your app with a ColorSchemeProvider in order to update the color scheme.'
    );
  },
};

/**
 * A hook that returns the current color scheme and a setter function to change the color scheme.
 * If a ColorSchemeProvider is not present in the tree, the default color scheme is used.
 */
export const useColorScheme = () => {
  return useContext(ColorSchemeContext) || defaultScheme;
};
