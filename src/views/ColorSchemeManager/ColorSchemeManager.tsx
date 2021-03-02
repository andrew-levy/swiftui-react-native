import React, { createContext, useState } from 'react';

type ColorSchemeProviderProps = { defaultMode?: 'light' | 'dark' };

export const ColorSchemeContext = createContext(null);

export const ColorSchemeManager: React.FC<ColorSchemeProviderProps> = ({
  defaultMode = 'light',
  children,
}) => {
  const [colorScheme, setColorScheme] = useState(defaultMode);
  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
