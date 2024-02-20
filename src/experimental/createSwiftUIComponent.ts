import { ComponentType, ReactNode, createElement } from 'react';
import { UIColor } from '../utils/colors';
import { Frame } from '../utils/frame';

export type ElementWithModifiers = React.ReactElement & {
  padding: (value: number) => ElementWithModifiers;
  bold: () => ElementWithModifiers;
  border: (width: number, color: UIColor) => ElementWithModifiers;
  imageScale: (scale: 'small' | 'medium' | 'large') => ElementWithModifiers;
  frame: (frame: Frame) => ElementWithModifiers;
};

export function createSwiftUIComponent(
  type: ComponentType<any>,
  props: any,
  children: ReactNode
) {
  const Element = deepUnfreeze(
    createElement(type, props, children)
  ) as ElementWithModifiers;

  Element.props.modifiers = [];
  Element.key = type.displayName;
  Element.padding = function (value) {
    this.props.push({ padding: true });
    return this;
  };
  Element.bold = function () {
    this.props = { ...this.props, bold: true };
    return this;
  };
  Element.border = function (width: number, color: UIColor) {
    this.props = { ...this.props, border: { width, color } };
    return this;
  };
  Element.imageScale = function (scale: 'small' | 'medium' | 'large') {
    this.props = { ...this.props, imageScale: scale };
    return this;
  };
  Element.frame = function ({ width, height, maxWidth, maxHeight }: Frame) {
    this.props = {
      ...this.props,
      frame: { width, height, maxWidth, maxHeight },
    };
    return this;
  };

  return Element;
}

function deepUnfreeze(obj: Object) {
  if (!Object.isFrozen(obj)) {
    return obj;
  }
  const unfrozenCopy = { ...obj };

  for (const key in unfrozenCopy) {
    if (
      unfrozenCopy.hasOwnProperty(key) &&
      typeof unfrozenCopy[key] === 'object' &&
      Object.isFrozen(unfrozenCopy[key])
    ) {
      unfrozenCopy[key] = deepUnfreeze(unfrozenCopy[key]);
    }
  }

  return unfrozenCopy;
}
