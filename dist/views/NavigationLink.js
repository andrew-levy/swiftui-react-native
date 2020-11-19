"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationLink = void 0;
const react_1 = __importDefault(require("react"));
const Button_1 = require("./Button");
exports.NavigationLink = ({ navigation, destination, distinationProps, children, label, }) => {
    return (react_1.default.createElement(Button_1.Button, { label: label, action: () => navigation.navigate(destination, distinationProps) }, children));
};
/* PROPS:
 * extends button props
 */
//# sourceMappingURL=NavigationLink.js.map