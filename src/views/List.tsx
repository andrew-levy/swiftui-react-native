import React, { Fragment, PropsWithChildren } from 'react';
import { Button } from './Button';

type ListProps = PropsWithChildren<React.ReactNode> & {};

export const List = ({ children }: ListProps) => {
	return <>{children}</>;
};
