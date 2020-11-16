"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnAppear = void 0;
const react_1 = require("react");
function useOnAppear(perfrom) {
    react_1.useEffect(() => perfrom(), []);
}
exports.useOnAppear = useOnAppear;
//# sourceMappingURL=useOnAppear.js.map