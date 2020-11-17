import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
	text?: string;
	action?: () => void;
	disabled?: boolean;
};

const StyledButton = styled.Button``;

export const Button: React.FC<ButtonProps> = ({ action, text }) => {
	return <StyledButton title={text} onPress={action} />;
};
