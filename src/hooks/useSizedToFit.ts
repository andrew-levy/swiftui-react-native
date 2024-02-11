import { useState } from 'react';
import { NativeSyntheticEvent } from 'react-native';

export function useSizedToFit() {
  const [size, setSize] = useState({
    width: '100%',
    height: 'auto',
  });
  return {
    size,
    onSized: (
      e: NativeSyntheticEvent<{
        value: {
          width: number;
          height: number;
        };
      }>
    ) => {
      const { width, height } = e.nativeEvent.value;
      setSize({ width, height } as any);
    },
  };
}
