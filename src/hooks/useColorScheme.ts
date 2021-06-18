import { useContext } from 'react';
import { ColorSchemeContext } from '../views/ColorSchemeManager';

export const useColorScheme = () =>
  useContext(ColorSchemeContext) || {
    colorScheme: 'light',
    setColorScheme: null,
  };
