import { useContext } from 'react';
import { SwiftUIRootContext } from '../views/SwiftUIRoot/SwiftUIRoot';

type EnvironmentKeys<T> = 'colorScheme' | keyof T;

export const useEnvironment = <T>(key: EnvironmentKeys<T>) => {
  const { envs, update } = useContext(SwiftUIRootContext);
  return [
    envs[key as string],
    (value: any) => update(key as string, value),
  ] as const;
};
