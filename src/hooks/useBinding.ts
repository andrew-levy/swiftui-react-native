import { useState } from 'react';
import { Binding } from '../utils/binding';

/**
 * Creates a Binding object that can be used to read and write to a value.
 * Components can recieve a binding as a prop and can handle the logic of
 * getting and setting the value from inside the component.
 * @param initialValue
 * @returns A Binding containing the value and a setter function.
 */
export function useBinding<T>(initialValue: T): Binding<T> {
  const [value, setValue] = useState<T>(initialValue);
  return { value, setValue };
}
