"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const Button_1 = require("./Button");
exports.Link = ({ text, destination }) => (react_1.default.createElement(Button_1.Button, { text: text, action: () => react_native_1.Linking.openURL(destination) }));
//# sourceMappingURL=Link.js.map