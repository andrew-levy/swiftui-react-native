"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationStack = void 0;
const react_1 = __importDefault(require("react"));
const stack_1 = require("@react-navigation/stack");
const Stack = stack_1.createStackNavigator();
exports.NavigationStack = ({ views }) => {
    return (react_1.default.createElement(Stack.Navigator, null, views.map((view) => (react_1.default.createElement(Stack.Screen, { name: view.name, component: view.component, options: view.options })))));
};
//# sourceMappingURL=NavigationStack.js.map