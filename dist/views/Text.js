"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const colors_1 = require("../themes/colors");
const fonts_1 = require("../themes/fonts");
const StyledText = styled_components_1.default.Text `
	${({ foregroundColor, fontSize, fontWeight, font, alignment }) => `color: ${foregroundColor
    ? colors_1.Colors.foreground[foregroundColor] || colors_1.Colors.foreground.black
    : colors_1.Colors.foreground.black}
		font-size: ${fontSize ? fontSize + 'px' : '16px'}
		font-weight: ${fontWeight
    ? fonts_1.Fonts.weights[fontWeight] || fonts_1.Fonts.weights.normal
    : fonts_1.Fonts.weights.normal};
		font-family: ${font ? fonts_1.Fonts.fonts[font] || fonts_1.Fonts.fonts.system : fonts_1.Fonts.fonts.system};
		text-align: ${alignment ? alignment : 'center'}
		`}
`;
exports.Text = ({ fontSize, foregroundColor, fontWeight, alignment, children, }) => {
    return (react_1.default.createElement(StyledText, { fontSize: fontSize, foregroundColor: foregroundColor, fontWeight: fontWeight, alignment: alignment }, children));
};
/*
 * font
 * font weight
 * bold
 * size
 * foregroundColor
 */
//# sourceMappingURL=Text.js.map