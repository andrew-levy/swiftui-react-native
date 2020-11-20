"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaddingFromProps = void 0;
const getPaddingValue = (selector, value, valueArray) => {
    switch (selector) {
        case 'top':
            valueArray[0] = value;
            break;
        case 'trailing':
            valueArray[1] = value;
            break;
        case 'bottom':
            valueArray[2] = value;
            break;
        case 'leading':
            valueArray[3] = value;
            break;
        case 'vertical':
            valueArray[0] = value;
            valueArray[2] = value;
            break;
        case 'horizontal':
            valueArray[1] = value;
            valueArray[3] = value;
            break;
        case 'all':
            valueArray[0] = value;
            valueArray[1] = value;
            valueArray[2] = value;
            valueArray[3] = value;
            break;
        default:
            break;
    }
};
exports.getPaddingFromProps = (paddingProps) => {
    const values = Array(4).fill(0);
    if (typeof paddingProps === 'number')
        return Array(4).fill(paddingProps);
    if (Array.isArray(paddingProps) && paddingProps.length === 2) {
        const [selectors, value] = paddingProps;
        if (Array.isArray(selectors)) {
            if (Array.isArray(value)) {
                selectors.forEach((selector, i) => {
                    getPaddingValue(selector, value[i], values);
                });
            }
            else {
                selectors.forEach((selector) => {
                    getPaddingValue(selector, value, values);
                });
            }
        }
        else if (typeof selectors === 'string') {
            getPaddingValue(selectors, value, values);
        }
    }
    console.log('padding values: ', values);
    return values;
};
//# sourceMappingURL=padding.js.map