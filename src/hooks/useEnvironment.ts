import { useContext } from 'react';
import { EnvironmentProviderContext } from '../views/EnvironmentProvider/EnvironmentProvider';

export const useEnvironment = () => {
  const env = useContext(EnvironmentProviderContext);
  if (!env) {
    console.warn(
      'In order to use the useEnvironment hook, you must wrap your component in a EnvironmentProvider.'
    );
  }
  return env;
};
