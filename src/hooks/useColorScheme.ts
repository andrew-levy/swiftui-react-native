import { useContext } from 'react';
import { SwiftUIRootContext } from '../views/SwiftUIRoot/SwiftUIRoot';

/**
 * A hook that returns the current color scheme and a setter function to change the color scheme.
 * If a ColorSchemeProvider is not present in the tree, the default color scheme is used.
 */
export const useColorScheme = () => {
  return useContext(SwiftUIRootContext).colorScheme;
};
