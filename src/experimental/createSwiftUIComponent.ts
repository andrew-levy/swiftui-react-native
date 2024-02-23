import { ComponentType, ReactNode, createElement } from 'react';
import { Color } from '../utils/colors';
import { Frame } from '../utils/frame';
import { Padding } from '../utils/padding';

export type ElementWithModifiers = JSX.Element & {
  padding: (value: Padding) => ElementWithModifiers;
  bold: () => ElementWithModifiers;
  border: ({
    width,
    color,
  }: {
    width: number;
    color: Color;
  }) => ElementWithModifiers;
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

  // @ts-ignore
  Element.ref = null;
  Element.key = type.displayName;
  Element.padding = function (value) {
    this.props = { ...this.props, padding: value };
    return this;
  };
  Element.bold = function () {
    this.props = { ...this.props, bold: true };
    return this;
  };
  Element.border = function ({
    width,
    color,
  }: {
    width: number;
    color: Color;
  }) {
    this.props = { ...this.props, border: { width, color } };
    return this;
  };
  Element.imageScale = function (scale: 'small' | 'medium' | 'large') {
    this.props = { ...this.props, imageScale: scale };
    return this;
  };
  Element.frame = function ({ width, height }: Frame) {
    this.props = {
      ...this.props,
      frame: { width, height },
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
