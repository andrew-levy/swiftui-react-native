import React from 'react';
import { Linking } from 'react-native';
import { Button } from './Button';

type LinkProps = {
	text: string;
	url: string;
};

export const Link: React.FC<LinkProps> = ({ text, url }) => (
	<Button text={text} action={() => Linking.openURL(url)} />
);
