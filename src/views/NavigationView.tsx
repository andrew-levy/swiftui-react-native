import React, { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';

type NavigationContainerProps = PropsWithChildren<React.ReactNode>;

export const NavigationView: React.FC<NavigationContainerProps> = ({
	children,
}) => {
	return <NavigationContainer>{children}</NavigationContainer>;
};
