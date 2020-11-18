"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const styled_components_1 = __importDefault(require("styled-components"));
const StyledListItem = styled_components_1.default.View `
  background-color: white;
  padding-top: 10;
  padding-bottom: 10;
  text-align: left;
`;
const StyledListWrapper = styled_components_1.default.View `
  background-color: white;
  width: 100%;
`;
exports.List = ({ listStyle, children }) => {
    const listChildren = [];
    react_1.default.Children.forEach(children, (child) => {
        console.log(child);
        listChildren.push(child);
    });
    return (react_1.default.createElement(StyledListWrapper, null,
        react_1.default.createElement(react_native_1.FlatList, { data: listChildren, renderItem: ({ item, index }) => (react_1.default.createElement(StyledListItem, null,
                react_1.default.cloneElement(item, item.props),
                index !== listChildren.length - 1 ? react_1.default.createElement(react_native_1.View, null) : null)) })));
};
/* PROPS:
 * list style : grouped, plain, default, inset
 * + any overrides:
 * background
 * padding
 * margin
 * border
 * zindex
 * hidden
 */
//# sourceMappingURL=List.js.map