"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const native_1 = require("@react-navigation/native");
const NavigationContainer = ({ children }) => {
    return react_1.default.createElement(native_1.NavigationContainer, null, children);
};
exports.default = NavigationContainer;
//# sourceMappingURL=NavigationContainer.js.map