"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollView = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
exports.ScrollView = ({ children, direction, }) => {
    return (react_1.default.createElement(react_native_1.ScrollView, { horizontal: direction === 'horizontal' }, children));
};
//# sourceMappingURL=ScrollView.js.map