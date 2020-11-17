"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabView = void 0;
const react_1 = __importDefault(require("react"));
const bottom_tabs_1 = require("@react-navigation/bottom-tabs");
const Tabs = bottom_tabs_1.createBottomTabNavigator();
exports.TabView = ({ options, tabs }) => {
    return (react_1.default.createElement(Tabs.Navigator, { screenOptions: options }, tabs.map((tab) => (react_1.default.createElement(Tabs.Screen, { name: tab.name, component: tab.component, options: tab.options })))));
};
//# sourceMappingURL=TabView.js.map