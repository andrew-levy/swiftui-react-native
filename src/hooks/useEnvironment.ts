import { useContext } from 'react';
import { SwiftUIRootContext } from '../views/SwiftUIRoot/SwiftUIRoot';

export const useEnvironment = <T>(key: T) => {
  const { envs, setEnv } = useContext(SwiftUIRootContext);
  return [envs[key], (value: string) => setEnv(key, value)];
};
