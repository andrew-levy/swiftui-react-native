"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const StyledImage = styled_components_1.default.Image ``;
exports.Image = ({ name }) => {
    return react_1.default.createElement(StyledImage, { soruce: null });
};
/* PROPS:
 * clipShape
 * image
 * margin
 * border
 * hidden
 * shaddow radius
 */
//# sourceMappingURL=Image.js.map