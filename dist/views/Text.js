"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const StyledText = styled_components_1.default.Text `
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
exports.Text = (props) => {
    return (react_1.default.createElement(StyledText, { size: props.size, color: props.color, bold: props.bold }, props.children));
};
/*
 * font
 * font weight
 * bold
 * size
 * foregroundColor
 */
//# sourceMappingURL=Text.js.map