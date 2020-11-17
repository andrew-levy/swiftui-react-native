import { useEffect } from 'react';

export function useOnDisappear(perform: () => void) {
  useEffect(() => perform, []);
}
