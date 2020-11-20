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
const formatPaddingStyles = (values) => {
    if (values && values.length === 4) {
        return `
      padding-top: ${values[0]}px;
      padding-right: ${values[1]}px;
      padding-bottom: ${values[2]}px;
      padding-left: ${values[3]}px;
    `;
    }
    return null;
};
exports.getPaddingFromProps = (paddingProps) => {
    const values = Array(4).fill(0);
    if (typeof paddingProps === 'number')
        return formatPaddingStyles(Array(4).fill(paddingProps));
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
            if (typeof value === 'number') {
                getPaddingValue(selectors, value, values);
            }
        }
    }
    return formatPaddingStyles(values);
};
//# sourceMappingURL=padding.js.map