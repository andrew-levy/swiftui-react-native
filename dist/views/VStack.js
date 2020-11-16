"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VStack = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const StyledVStack = styled_components_1.default.View `
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
exports.VStack = (props) => {
    return react_1.default.createElement(StyledVStack, Object.assign({}, props), props.children);
};
//# sourceMappingURL=VStack.js.map