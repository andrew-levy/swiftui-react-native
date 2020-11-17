"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const StyledButton = styled_components_1.default.Button ``;
exports.Button = ({ action, text }) => {
    return react_1.default.createElement(StyledButton, { title: text, onPress: action });
};
//# sourceMappingURL=Button.js.map