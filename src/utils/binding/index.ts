import { SetStateAction } from 'react';

export type Binding<T> = {
  value: T;
  setValue: React.Dispatch<SetStateAction<T>>;
};

export type BooleanBinding = Binding<boolean> & { toggle: () => void };
