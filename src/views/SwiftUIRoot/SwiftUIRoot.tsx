import React, { createContext, useState } from 'react';
import { WithChildren } from '../../utils/modifiers';

export const SwiftUIRootContext = createContext<{
  colorScheme?: 'light' | 'dark';
  [key: string]: any;
} | null>(null);

type SwiftUIRootProps = WithChildren & {
  environment?: { [key: string]: any };
  preferredColorScheme?: 'light' | 'dark';
};

export const SwiftUIRoot = ({ environment, children }: SwiftUIRootProps) => {
  const [envs, setEnvs] = useState({
    colorScheme: 'light',
    ...environment,
  });

  const setEnv = (key: string, value: any) => {
    setEnvs({
      ...envs,
      [key]: value,
    });
  };

  return (
    <SwiftUIRootContext.Provider value={{ envs, setEnv }}>
      {children}
    </SwiftUIRootContext.Provider>
  );
};
