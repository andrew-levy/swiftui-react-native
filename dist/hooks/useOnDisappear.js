"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnDisappear = void 0;
const react_1 = require("react");
function useOnDisappear(perform) {
    react_1.useEffect(() => perform, []);
}
exports.useOnDisappear = useOnDisappear;
//# sourceMappingURL=useOnDisappear.js.map