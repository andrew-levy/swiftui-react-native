import React from 'react';
import styled from 'styled-components';

type VStackProps = {};

const StyledVStack = styled.View`
	flex: 1;
	background-color: ${(props) => {
		switch (props.backgroundColor) {
			case 'systemGrey6':
				return '#f2f2f2';
			default:
				return '#fff';
		}
	}};
	align-items: center;
	justify-content: center;
`;
export const VStack: React.FC<VStackProps> = (props) => {
	return <StyledVStack {...props}>{props.children}</StyledVStack>;
};
