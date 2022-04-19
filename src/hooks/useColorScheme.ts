import { useContext } from 'react';
import { EnvironmentProviderContext } from '../views/EnvironmentProvider/EnvironmentProvider';

export const useColorScheme = () => {
  return useContext(EnvironmentProviderContext)?.envs?.colorScheme || 'light';
};
