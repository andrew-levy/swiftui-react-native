"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnAppear = void 0;
const react_1 = require("react");
function useOnAppear(effect) {
    react_1.useEffect(() => effect(), []);
}
exports.useOnAppear = useOnAppear;
//# sourceMappingURL=useOnAppear copy.js.map