import React, { PropsWithChildren, ReactNode } from 'react';
import { ScrollView as RNScrollView } from 'react-native';

type ScrollViewProps = PropsWithChildren<ReactNode> & {
	direction?: string;
};

export const ScrollView: React.FC<ScrollViewProps> = ({
	children,
	direction,
}) => {
	return (
		<RNScrollView horizontal={direction === 'horizontal'}>
			{children}
		</RNScrollView>
	);
};
