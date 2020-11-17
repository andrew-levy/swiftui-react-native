"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextField = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const StyledTextField = styled_components_1.default.TextInput ``;
exports.TextField = ({ placeholder, text, onChangeText, }) => {
    return (react_1.default.createElement(StyledTextField, { placeholder: placeholder, value: text, onChangeText: onChangeText }));
};
//# sourceMappingURL=TextField.js.map