import { useContext } from 'react';
import { ColorSchemeContext } from '../views/ColorSchemeProvider/ColorSchemeProvider';

const defaultScheme = {
  colorScheme: 'light',
  setColorScheme: (_: 'light' | 'dark' | 'auto') => {
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
