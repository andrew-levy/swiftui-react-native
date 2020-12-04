import { Padding } from '../types/stylePropTypes';

const getPaddingValue = (
  selector: string,
  value: number,
  valueArray: Array<number>
) => {
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

const formatPaddingStyles = (values: Array<number>) => {
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

export const getPaddingFromProps = (paddingProps: Padding) => {
  const values = Array(4).fill(0);
  if (!paddingProps) return values;
  if (typeof paddingProps === 'number')
    return formatPaddingStyles(Array(4).fill(paddingProps));
  Object.keys(paddingProps).forEach((key) => {
    getPaddingValue(key, paddingProps[key], values);
  });
  return formatPaddingStyles(values);
};
