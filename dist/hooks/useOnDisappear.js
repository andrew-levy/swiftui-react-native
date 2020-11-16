"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnAppear = void 0;
const react_1 = require("react");
function useOnAppear(perform) {
    react_1.useEffect(() => perform, []);
}
exports.useOnAppear = useOnAppear;
//# sourceMappingURL=useOnDisappear.js.map