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
const Spacer_1 = require("./Spacer");
const StyledVStack = styled_components_1.default.View `
  ${({ background, alignment, cornerRadius, padding }) => `
    flex: 1;
    background-color: ${background
    ? colors_1.Colors.background[background] || colors_1.Colors.background.white
    : colors_1.Colors.background.white};
    align-items: ${alignment
    ? fonts_1.Fonts.alignment[alignment] || fonts_1.Fonts.alignment.center
    : fonts_1.Fonts.alignment.center};
		justify-content: center;
		border-radius: ${cornerRadius || 0};
		padding: ${padding || 0}
		width: 100%;
  `}
`;
exports.VStack = (props) => {
    return (react_1.default.createElement(StyledVStack, Object.assign({}, props), props.spacing || props.spacing !== 0
        ? react_1.default.Children.map(props.children, (child) => (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Spacer_1.Spacer, { space: props.spacing || 0 }),
            child,
            react_1.default.createElement(Spacer_1.Spacer, { space: props.spacing || 0 }))))
        : props.children));
};
//# sourceMappingURL=VStack.js.map