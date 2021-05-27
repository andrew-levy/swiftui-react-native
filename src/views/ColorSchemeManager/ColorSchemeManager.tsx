import React, { createContext, useState } from 'react';

export type ColorScheme = 'light' | 'dark';
type ColorSchemeProviderProps = { defaultMode?: ColorScheme };

export const ColorSchemeContext = createContext(null);

export const ColorSchemeManager: React.FC<ColorSchemeProviderProps> = ({
  defaultMode = 'light',
  children,
}) => {
  const [colorScheme, setColorScheme] = useState(defaultMode);
  const toggleColorScheme = (to: ColorScheme = null) => {
    if (to) {
      setColorScheme(to);
    } else if (colorScheme === 'light') {
      setColorScheme('dark');
    } else {
      setColorScheme('light');
    }
  };
  return (
    <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
