import React, { createContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { WithChildren } from '../../utils/modifiers';

export type EnvironmentValues = {
  colorScheme: 'light' | 'dark';
  locale: string;
};

type EnvironmentContext = {
  colorScheme: EnvironmentValues['colorScheme'];
  locale: EnvironmentValues['locale'];
  setValues: (values: Partial<EnvironmentValues>) => void;
} | null;

type EnvironmentProviderProps = WithChildren<
  Partial<{
    [K in keyof EnvironmentValues]: EnvironmentValues[K];
  }>
>;

export const EnvironmentProviderContext =
  createContext<EnvironmentContext>(null);

export const EnvironmentProvider = ({
  colorScheme,
  locale,
  children,
}: EnvironmentProviderProps) => {
  const systemColorScheme = useColorScheme();
  const colorSchemeValue = colorScheme || systemColorScheme || 'light';
  const localeValue = locale || 'en';

  const [envValues, setEnvValues] = useState<EnvironmentValues>({
    colorScheme: colorSchemeValue,
    locale: localeValue,
  });

  const setValues = (newValues: Partial<EnvironmentValues>) => {
    setEnvValues((prevEnvironment) => ({
      ...prevEnvironment,
      ...newValues,
    }));
  };

  return (
    <EnvironmentProviderContext.Provider
      value={{
        ...envValues,
        setValues,
      }}
    >
      {children}
    </EnvironmentProviderContext.Provider>
  );
};
