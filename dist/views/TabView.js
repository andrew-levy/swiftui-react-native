"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabView = void 0;
const react_1 = __importDefault(require("react"));
const bottom_tabs_1 = require("@react-navigation/bottom-tabs");
const Tabs = bottom_tabs_1.createBottomTabNavigator();
exports.TabView = ({ options, children }) => {
    return (react_1.default.createElement(Tabs.Navigator, { screenOptions: options }, react_1.default.Children.map(children, (child) => (react_1.default.createElement(Tabs.Screen, { name: child.props.name, component: child.props.component, options: child.props.options })))));
};
{
    /* <Tabs.Navigator screenOptions={options}>
  {tabs.map((tab) => (
      <Tabs.Screen
          name={tab.name}
          component={tab.component}
          options={tab.options}
      />
  ))}
  </Tabs.Navigator> */
}
//# sourceMappingURL=TabView.js.map