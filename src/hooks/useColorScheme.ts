import { useContext } from 'react';
import { ColorSchemeContext } from '../views/ColorSchemeManager';

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (!context)
    throw new Error(
      'No color scheme was detected. Have your wrapped your components with a ColorSchemeManager?'
    );
  return context;
};
