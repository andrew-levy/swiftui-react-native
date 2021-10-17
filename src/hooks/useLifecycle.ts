import { useEffect } from 'react';

export const useLifecycle = (onAppear: () => void, onDisappear: () => void) => {
  useEffect(() => {
    if (onAppear) {
      onAppear();
    }
    return onDisappear ? onDisappear : () => {};
  }, [onAppear, onDisappear]);
};
