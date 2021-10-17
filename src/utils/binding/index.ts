export type Binding<T> = {
  value: T;
  setValue: (value: T) => void;
};
