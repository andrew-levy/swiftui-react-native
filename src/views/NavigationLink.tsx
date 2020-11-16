import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from 'react-native';

type NavigationLinkProps = {
	navigation: StackNavigationProp<any, any>;
	destination: string;
	distinationProps?: object | undefined;
	text: string;
};

export const NavigationLink: React.FC<NavigationLinkProps> = ({
	navigation,
	destination,
	distinationProps,
	text,
}) => {
	return (
		<Button
			title={text}
			onPress={() => navigation.navigate(destination, distinationProps)}
		/>
	);
};
