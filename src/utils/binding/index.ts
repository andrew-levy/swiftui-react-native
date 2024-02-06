import { SetStateAction } from 'react';

export type Binding<T> = {
  value: T;
  setValue: React.Dispatch<SetStateAction<T>>;
};

export type BooleanBinding = Binding<boolean> & { toggle: () => void };

export function getValueOrBinding<T>(incoming: T | Binding<T>) {
  const value =
    incoming && typeof incoming === 'object' && 'value' in incoming
      ? incoming.value
      : incoming;
  return value;
}
