import React, { useState } from 'react';

export type ColorSchemeOptions = 'light' | 'dark';

type ColorSchemeProviderProps = {
  preferredColorScheme?: ColorSchemeOptions;
  children: React.ReactNode;
};

export type ColorSchemeContextType = {
  colorScheme: ColorSchemeOptions;
  setColorScheme: (colorScheme: 'light' | 'dark') => void;
};

export const ColorSchemeContext =
  React.createContext<ColorSchemeContextType | null>(null);

export const ColorSchemeProvider = ({
  children,
  preferredColorScheme = 'light',
}: ColorSchemeProviderProps) => {
  const [current, setCurrent] = useState(preferredColorScheme);
  const value = {
    colorScheme: current,
    setColorScheme: setCurrent,
  };

  return (
    <ColorSchemeContext.Provider value={value}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
