"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HStack = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const colors_1 = require("../themes/colors");
const StyledHStack = styled_components_1.default.View `
	${({ backgroundColor }) => `
    flex: 1;
    flex-direction: row;
    background-color: ${backgroundColor
    ? colors_1.Colors.background[backgroundColor] || colors_1.Colors.background.white
    : colors_1.Colors.background.white};
    align-items: center;
    justify-content: center;
  `}
`;
exports.HStack = ({ children }) => {
    return react_1.default.createElement(StyledHStack, null, children);
};
//# sourceMappingURL=HStack.js.map