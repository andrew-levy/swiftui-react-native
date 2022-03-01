import React, { createContext, useState } from 'react';
import { WithChildren } from '../../utils/modifiers';

type SwiftUIRootProps = WithChildren & {
  environment?: { [key: string]: any };
};
export const SwiftUIRootContext = createContext<{
  envs: {
    colorScheme?: 'light' | 'dark';
    [key: string]: any;
  };
  update: (key: string, value: any) => void;
} | null>(null);

export const SwiftUIRoot = ({ environment, children }: SwiftUIRootProps) => {
  const [envs, setEnvs] = useState<{
    colorScheme?: 'light' | 'dark';
    [key: string]: any;
  }>({
    colorScheme: 'light',
    ...environment,
  });

  const update = (key: string, value: any) => {
    setEnvs({
      ...envs,
      [key]: value,
    });
  };

  return (
    <SwiftUIRootContext.Provider value={{ envs, update }}>
      {children}
    </SwiftUIRootContext.Provider>
  );
};
