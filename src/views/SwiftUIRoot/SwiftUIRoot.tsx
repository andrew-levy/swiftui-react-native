import React, { createContext, useState } from 'react';
import { WithChildren } from '../../utils/modifiers';

type SwiftUIRootProps = WithChildren & {
  environment?: { [key: string]: any };
};
export const SwiftUIRootContext = createContext<{
  envs: {
    colorScheme?: 'light' | 'dark';
    [key: string]: unknown;
  };
  setValueAtKey: (key: string, value: unknown) => void;
} | null>(null);

export const SwiftUIRoot = ({ environment, children }: SwiftUIRootProps) => {
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
    <SwiftUIRootContext.Provider value={{ envs, setValueAtKey }}>
      {children}
    </SwiftUIRootContext.Provider>
  );
};
