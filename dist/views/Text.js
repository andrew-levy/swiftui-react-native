"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const colors_1 = require("../themes/colors");
const fonts_1 = require("../themes/fonts");
const Button_1 = require("./Button");
const padding_1 = require("../utils/padding");
const shadow_1 = require("../utils/shadow");
const StyledText = styled_components_1.default.Text `
  ${({ foregroundColor, fontSize, fontWeight, font, alignment, textType, padding, cornerRadius, shadow, }) => `color: ${textType
    ? `${colors_1.Colors.foreground.buttonText}`
    : foregroundColor
        ? colors_1.Colors.foreground[foregroundColor] || colors_1.Colors.foreground.black
        : colors_1.Colors.foreground.black}
		font-size: ${fontSize ? fontSize + 'px' : '18px'}
		font-weight: ${fontWeight
    ? fonts_1.Fonts.weights[fontWeight] || fonts_1.Fonts.weights.normal
    : fonts_1.Fonts.weights.normal};
		font-family: ${font ? fonts_1.Fonts.fonts[font] || fonts_1.Fonts.fonts.system : fonts_1.Fonts.fonts.system};
    text-align: ${alignment ? alignment : 'center'};
    border-radius: ${cornerRadius || 0}px;
    ${padding_1.getPaddingFromProps(padding)}
    ${shadow_1.getShadowFromProps(shadow)}
    `}
`;
exports.Text = ({ fontSize, foregroundColor, fontWeight, alignment, padding, cornerRadius, shadow, children, }) => {
    const textType = react_1.useContext(Button_1.ButtonWrapperContext);
    return (react_1.default.createElement(StyledText, { fontSize: fontSize, foregroundColor: foregroundColor, fontWeight: fontWeight, alignment: alignment, padding: padding, cornerRadius: cornerRadius, shadow: shadow, textType: textType }, children));
};
/* PROPS:
 * font
 * font weight
 * font size
 * foreground color
 * background
 * padding
 * margin
 * border
 * underline
 * italics
 * zindex
 * hidden
 */
//# sourceMappingURL=Text.js.map