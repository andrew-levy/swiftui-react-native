import { ReactElement } from 'react';

export const ForEach = <T>(
  iterable: T[],
  renderFn: (element: T, index: number) => ReactElement<any>
) => {
  return iterable.map(renderFn);
};
