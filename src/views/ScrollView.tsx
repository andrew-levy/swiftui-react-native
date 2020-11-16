import React, { PropsWithChildren, ReactNode } from 'react';
import { ScrollView as RNScrollView } from 'react-native';

type ScrollViewProps = PropsWithChildren<ReactNode> & {};

export const ScrollView: React.FC<ScrollViewProps> = ({ children }) => {
	return <RNScrollView>{children}</RNScrollView>;
};
