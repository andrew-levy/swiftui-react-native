import React from 'react';
import styled from 'styled-components';

const StyledText = styled.Text`
	color: ${(props) => {
		switch (props.color) {
			case 'systemGrey6':
				return '#f2f2f2';
			case 'white':
				return '#fff';
			case 'systemBlue':
				return '#3484F7';
			default:
				return '#000';
		}
	}};
	font-size: ${(props) => {
		switch (props.size) {
			case 'xs':
				return '12px';
			case 'sm':
				return '16px';
			case 'md':
				return '24px';
			case 'lg':
				return '36px';
			case 'xl':
				return '40px';
			case '2xl':
				return '50px';
			default:
				return '24px';
		}
	}};
	font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
`;

type TextProps = {
	size?: number;
	color?: string;
	bold?: boolean;
};

export const Text: React.FC<TextProps> = (props) => {
	return (
		<StyledText size={props.size} color={props.color} bold={props.bold}>
			{props.children}
		</StyledText>
	);
};

/*
 * font
 * font weight
 * bold
 * size
 * foregroundColor
 */
