"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const react_1 = __importDefault(require("react"));
const HStack_1 = require("./HStack");
const Text_1 = require("./Text");
const Image_1 = require("./Image");
exports.Label = ({ text, image }) => {
    return (react_1.default.createElement(HStack_1.HStack, null,
        react_1.default.createElement(Image_1.Image, { name: image }),
        react_1.default.createElement(Text_1.Text, null, text)));
};
//# sourceMappingURL=Label.js.map