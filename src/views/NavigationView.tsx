import React, { PropsWithChildren } from 'react';
import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';

type NavigationContainerProps = PropsWithChildren<React.ReactNode>;

const NavigationContainer = ({ children }: NavigationContainerProps) => {
	return <RNNavigationContainer>{children}</RNNavigationContainer>;
};
export default NavigationContainer;
