import React, { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';
import { Fonts } from '../themes/fonts';

const StyledText = styled.Text`
	${({ foregroundColor, fontSize, fontWeight, font, alignment }) =>
		`color: ${
			foregroundColor
				? Colors.foreground[foregroundColor] || Colors.foreground.black
				: Colors.foreground.black
		}
		font-size: ${fontSize ? fontSize + 'px' : '16px'}
		font-weight: ${
			fontWeight
				? Fonts.weights[fontWeight] || Fonts.weights.normal
				: Fonts.weights.normal
		};
		font-family: ${
			font ? Fonts.fonts[font] || Fonts.fonts.system : Fonts.fonts.system
		};
		text-align: ${alignment ? alignment : 'center'}
		`}
`;

type TextProps = PropsWithChildren<ReactNode> & {
	fontSize?: number;
	foregroundColor?: string;
	fontWeight?: string;
	alignment?: string;
};

export const Text: React.FC<TextProps> = ({
	fontSize,
	foregroundColor,
	fontWeight,
	alignment,
	children,
}) => {
	return (
		<StyledText
			fontSize={fontSize}
			foregroundColor={foregroundColor}
			fontWeight={fontWeight}
			alignment={alignment}
		>
			{children}
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
