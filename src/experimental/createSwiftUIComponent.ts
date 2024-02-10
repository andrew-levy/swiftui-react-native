import { ComponentType, ReactNode, createElement } from 'react';

type ElementWithModifiers = React.ReactElement & {
  padding: (value: number) => ElementWithModifiers;
  bold: () => ElementWithModifiers;
  border: (width: number) => ElementWithModifiers;
  imageScale: (scale: 'small' | 'medium' | 'large') => ElementWithModifiers;
};

export function createSwiftUIComponent(
  type: ComponentType<any>,
  props: any,
  children: ReactNode
) {
  console.log('children:! ', children);
  const Element = deepUnfreeze(
    createElement(type, props, children)
  ) as ElementWithModifiers;

  Element.props.modifiers = [];
  Element.padding = function (value) {
    this.props.modifiers.push({ padding: true });
    return this;
  };
  Element.bold = function () {
    this.props.modifiers.push({ bold: true });
    return this;
  };
  Element.border = function (width) {
    this.props.modifiers.push({ border: true });
    return this;
  };
  Element.imageScale = function (scale: 'small' | 'medium' | 'large') {
    this.props.modifiers.push({ imageScale: scale });
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
