import { useContext } from 'react';
import { EnvironmentProviderContext } from '../views/EnvironmentProvider/EnvironmentProvider';

type EnvironmentKeys<T> = 'colorScheme' | keyof T;

export const useEnvironment = <T, V>(key: EnvironmentKeys<T>) => {
  const ctx = useContext(EnvironmentProviderContext) as unknown as {
    envs: T;
    setValueAtKey: (key: string, value: V) => void;
  };
  if (!ctx) {
    console.warn(
      'In order to use useEnvironment, you must wrap your component in a EnvironmentProvider.'
    );
    return [undefined, () => {}];
  }
  const { envs, setValueAtKey } = ctx;
  return [
    envs[key as keyof T] as unknown as V,
    (value: V) => setValueAtKey(key as string, value as unknown as V),
  ] as const;
};
