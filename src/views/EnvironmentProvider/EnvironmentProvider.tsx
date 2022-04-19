import React, { createContext, useState } from 'react';
import { WithChildren } from '../../utils/modifiers';

type EnvironmentProviderProps = WithChildren & {
  environment?: { [key: string]: any };
};
export const EnvironmentProviderContext = createContext<{
  envs: {
    colorScheme?: 'light' | 'dark';
    [key: string]: unknown;
  };
  setValueAtKey: (key: string, value: unknown) => void;
} | null>(null);

export const EnvironmentProvider = ({
  environment,
  children,
}: EnvironmentProviderProps) => {
  const [envs, setEnvs] = useState<{
    colorScheme?: 'light' | 'dark';
    [key: string]: unknown;
  }>({
    colorScheme: 'light',
    ...environment,
  });

  const setValueAtKey = (key: string, value: unknown) => {
    setEnvs({
      ...envs,
      [key]: value,
    });
  };

  return (
    <EnvironmentProviderContext.Provider value={{ envs, setValueAtKey }}>
      {children}
    </EnvironmentProviderContext.Provider>
  );
};
