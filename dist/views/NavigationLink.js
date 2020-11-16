"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationLink = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
exports.NavigationLink = ({ navigation, destination, distinationProps, text, }) => {
    return (react_1.default.createElement(react_native_1.Button, { title: text, onPress: () => navigation.navigate(destination, distinationProps) }));
};
//# sourceMappingURL=NavigationLink.js.map