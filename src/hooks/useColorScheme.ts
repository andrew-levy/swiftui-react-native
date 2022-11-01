import { useContext } from 'react';
import { Modifiers } from '../utils/modifiers';
import { EnvironmentProviderContext } from '../views/EnvironmentProvider/EnvironmentProvider';

export const useColorScheme = (
  preferredColorScheme: Modifiers['preferredColorScheme']
) => {
  const colorScheme =
    useContext(EnvironmentProviderContext)?.colorScheme || 'light';
  return preferredColorScheme || colorScheme;
};
