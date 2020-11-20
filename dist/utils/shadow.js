"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShadowFromProps = void 0;
const colors_1 = require("../themes/colors");
exports.getShadowFromProps = (shadowProps) => {
    if (shadowProps) {
        return `border-radius: ${shadowProps.x}px ${shadowProps.y}px ${shadowProps.radius}px ${colors_1.Colors.background[shadowProps.color] || colors_1.Colors.background.black}`;
    }
    return null;
};
//# sourceMappingURL=shadow.js.map