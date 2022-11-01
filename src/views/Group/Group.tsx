import React, { Children, cloneElement, ReactElement } from 'react';
import { UIColor } from '../../utils/colors';
import { Modifiers, TextModifiers, WithChildren } from '../../utils/modifiers';

type GroupProps = WithChildren<
  Modifiers &
    TextModifiers & {
      fill?: UIColor;
    }
>;

export const Group = ({ children, ...rest }: GroupProps) => {
  const groupId = Math.floor(Math.random()) * 1000;
  return (
    <>
      {Children.map(children as ReactElement<any>[], (child, i) =>
        child
          ? cloneElement(child, {
              key: `group-${groupId}-${i}`,
              ...rest,
              ...child.props,
            })
          : null
      )}
    </>
  );
};
