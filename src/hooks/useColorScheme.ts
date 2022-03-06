import { useContext } from 'react';
import { SwiftUIRootContext } from '../views/SwiftUIRoot/SwiftUIRoot';

export const useColorScheme = () => {
  return useContext(SwiftUIRootContext)?.envs?.colorScheme || 'light';
};
