import React, { useState } from 'react';
import { useColorScheme } from 'react-native';

type ColorSchemeProviderProps = {
  preferredColorScheme?: 'light' | 'dark' | 'auto';
  children: React.ReactNode;
};

export const ColorSchemeContext = React.createContext<{
  colorScheme: string;
  setColorScheme: (colorScheme: 'light' | 'dark' | 'auto') => void;
} | null>(null);

export const ColorSchemeProvider = ({
  children,
  preferredColorScheme = 'light',
}: ColorSchemeProviderProps) => {
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);
  const systemColorScheme = useColorScheme();
  const value = {
    colorScheme: colorScheme === 'auto' ? systemColorScheme : colorScheme,
    setColorScheme,
  };

  return (
    <ColorSchemeContext.Provider value={value}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
