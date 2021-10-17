import React, { createContext, ReactElement } from 'react';
import { ListProps } from '../List';

type ListStyleProviderProps = {
  separatorColor: string;
  sideBar: boolean;
  children: ReactElement<ListProps>;
};
export const ListStyleContext = createContext(null);

export const ListStyleProvider = ({
  children,
  sideBar,
  separatorColor,
}: ListStyleProviderProps) => {
  return (
    <ListStyleContext.Provider value={{ sideBar, separatorColor }}>
      {children}
    </ListStyleContext.Provider>
  );
};
