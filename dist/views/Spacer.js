"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spacer = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const StyledSpacer = styled_components_1.default.View `
  ${({ direction, space }) => direction
    ? direction === 'horizontal'
        ? `width: ${space || 10}`
        : `height: ${space || 10}`
    : `height: ${space || 10}`}
`;
exports.Spacer = ({ direction, space }) => {
    return react_1.default.createElement(StyledSpacer, { direction: direction, space: space });
};
/* PROPS:
 * direction
 * space
 */
//# sourceMappingURL=Spacer.js.map