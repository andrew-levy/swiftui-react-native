import { useContext } from 'react';
import {
  EnvironmentProviderContext,
  EnvironmentValues,
} from '../views/EnvironmentProvider/EnvironmentProvider';

export const useEnvironment = (): {
  colorScheme: EnvironmentValues['colorScheme'];
  locale: EnvironmentValues['locale'];
  setValues: (values: Partial<EnvironmentValues>) => void;
} => {
  const env = useContext(EnvironmentProviderContext);
  if (!env) {
    console.warn(
      'In order to use the useEnvironment hook, you must wrap your component in a EnvironmentProvider.'
    );
  }
  return env;
};
