"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VStack = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const colors_1 = require("../themes/colors");
const fonts_1 = require("../themes/fonts");
const StyledVStack = styled_components_1.default.View `
	${({ backgroundColor, alignment }) => `
    flex: 1;
    background-color: ${backgroundColor
    ? colors_1.Colors.background[backgroundColor] || colors_1.Colors.background.white
    : colors_1.Colors.background.white};
    align-items: ${alignment
    ? fonts_1.Fonts.alignment[alignment] || fonts_1.Fonts.alignment.center
    : fonts_1.Fonts.alignment.center};
    justify-content: center;
  `}
`;
exports.VStack = (props) => {
    return react_1.default.createElement(StyledVStack, Object.assign({}, props), props.children);
};
//# sourceMappingURL=VStack.js.map