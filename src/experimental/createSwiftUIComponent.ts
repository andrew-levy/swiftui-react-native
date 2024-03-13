import { ComponentType, ReactNode, createElement } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Modifiers } from '../utils/modifiers';

export type ElementWithModifiers = JSX.Element & {
  padding: (padding: Modifiers['padding']) => ElementWithModifiers;
  border: (border: Modifiers['border']) => ElementWithModifiers;
  foregroundStyle: (
    foregroundStyle: Modifiers['foregroundStyle']
  ) => ElementWithModifiers;
  rotationEffect: (
    rotationEffect: Modifiers['rotationEffect']
  ) => ElementWithModifiers;
  scaleEffect: (scaleEffect: Modifiers['scaleEffect']) => ElementWithModifiers;
  shadow: (shadow: Modifiers['shadow']) => ElementWithModifiers;
  background: (background: Modifiers['background']) => ElementWithModifiers;
  hidden: () => ElementWithModifiers;
  frame: (frame: Modifiers['frame']) => ElementWithModifiers;
  zIndex: (zIndex: Modifiers['zIndex']) => ElementWithModifiers;
  opacity: (opacity: Modifiers['opacity']) => ElementWithModifiers;
  tint: (tint: Modifiers['tint']) => ElementWithModifiers;
  cornerRadius: (
    cornerRadius: Modifiers['cornerRadius']
  ) => ElementWithModifiers;
  position: (position: Modifiers['position']) => ElementWithModifiers;
  offset: (offset: Modifiers['offset']) => ElementWithModifiers;
  animation: (animation: Modifiers['animation']) => ElementWithModifiers;
  contentTransition: (
    contentTransition: Modifiers['contentTransition']
  ) => ElementWithModifiers;
  blur: (blur: Modifiers['blur']) => ElementWithModifiers;
  saturation: (saturation: Modifiers['saturation']) => ElementWithModifiers;
  grayscale: (grayscale: Modifiers['grayscale']) => ElementWithModifiers;
  brightness: (brightness: Modifiers['brightness']) => ElementWithModifiers;
  contrast: (contrast: Modifiers['contrast']) => ElementWithModifiers;
  blendMode: (blendMode: Modifiers['blendMode']) => ElementWithModifiers;
  mask: (mask: Modifiers['mask']) => ElementWithModifiers;
  clipShape: (clipShape: Modifiers['clipShape']) => ElementWithModifiers;
  environment: (environment: Modifiers['environment']) => ElementWithModifiers;
  textContentType: (
    textContentType: Modifiers['textContentType']
  ) => ElementWithModifiers;
  keyboardType: (
    keyboardType: Modifiers['keyboardType']
  ) => ElementWithModifiers;
  textInputAutocapitalization: (
    textInputAutocapitalization: Modifiers['textInputAutocapitalization']
  ) => ElementWithModifiers;
  autocorrectionDisabled: (
    value: Modifiers['autocorrectionDisabled']
  ) => ElementWithModifiers;
  resizable: () => ElementWithModifiers;
  imageScale: (imageScale: Modifiers['imageScale']) => ElementWithModifiers;
  symbolRenderingMode: (
    symbolRenderingMode: Modifiers['symbolRenderingMode']
  ) => ElementWithModifiers;
  fontSize: (fontSize: Modifiers['fontSize']) => ElementWithModifiers;
  fontWeight: (fontWeight: Modifiers['fontWeight']) => ElementWithModifiers;
  font: (font: Modifiers['font']) => ElementWithModifiers;
  bold: (isActive?: Modifiers['bold']) => ElementWithModifiers;
  italic: (isActive: Modifiers['italic']) => ElementWithModifiers;
  strikethrough: (isActive: Modifiers['strikethrough']) => ElementWithModifiers;
  underline: (isActive: Modifiers['underline']) => ElementWithModifiers;
  buttonStyle: (buttonStyle: Modifiers['buttonStyle']) => ElementWithModifiers;
  pickerStyle: (pickerStyle: Modifiers['pickerStyle']) => ElementWithModifiers;
  textFieldStyle: (
    textFieldStyle: Modifiers['textFieldStyle']
  ) => ElementWithModifiers;
  listStyle: (listStyle: Modifiers['listStyle']) => ElementWithModifiers;
  sensoryFeedback: (
    sensoryFeedback: Modifiers['sensoryFeedback']
  ) => ElementWithModifiers;
  labelIsHidden: () => ElementWithModifiers;
  style: (style: StyleProp<ViewStyle | TextStyle>) => ElementWithModifiers;
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
  Element.bold = function (isActive = true) {
    this.props = { ...this.props, bold: isActive };
    return this;
  };
  Element.border = function ({ color, width }) {
    this.props = { ...this.props, border: { width, color } };
    return this;
  };
  Element.imageScale = function (scale) {
    this.props = { ...this.props, imageScale: scale };
    return this;
  };
  Element.frame = function ({ width, height }) {
    this.props = {
      ...this.props,
      frame: { width, height },
    };
    return this;
  };

  Element.foregroundStyle = function (foregroundStyle) {
    this.props = { ...this.props, foregroundStyle };
    return this;
  };

  Element.rotationEffect = function (rotationEffect) {
    this.props = { ...this.props, rotationEffect };
    return this;
  };

  Element.scaleEffect = function (scaleEffect) {
    this.props = { ...this.props, scaleEffect };
    return this;
  };

  Element.shadow = function (shadow) {
    this.props = { ...this.props, shadow };
    return this;
  };

  Element.background = function (background) {
    this.props = { ...this.props, background };
    return this;
  };

  Element.hidden = function () {
    this.props = { ...this.props, hidden: true };
    return this;
  };

  Element.zIndex = function (zIndex) {
    this.props = { ...this.props, zIndex };
    return this;
  };

  Element.opacity = function (opacity) {
    this.props = { ...this.props, opacity };
    return this;
  };

  Element.tint = function (tint) {
    this.props = { ...this.props, tint };
    return this;
  };

  Element.cornerRadius = function (cornerRadius) {
    this.props = { ...this.props, cornerRadius };
    return this;
  };

  Element.position = function (position) {
    this.props = { ...this.props, position };
    return this;
  };

  Element.offset = function (offset) {
    this.props = { ...this.props, offset };
    return this;
  };

  Element.animation = function (animation) {
    this.props = { ...this.props, animation };
    return this;
  };

  Element.contentTransition = function (contentTransition) {
    this.props = { ...this.props, contentTransition };
    return this;
  };

  Element.blur = function (blur) {
    this.props = { ...this.props, blur };
    return this;
  };

  Element.saturation = function (saturation) {
    this.props = { ...this.props, saturation };
    return this;
  };

  Element.grayscale = function (grayscale) {
    this.props = { ...this.props, grayscale };
    return this;
  };

  Element.brightness = function (brightness) {
    this.props = { ...this.props, brightness };
    return this;
  };

  Element.contrast = function (contrast) {
    this.props = { ...this.props, contrast };
    return this;
  };

  Element.blendMode = function (blendMode) {
    this.props = { ...this.props, blendMode };
    return this;
  };

  Element.mask = function (mask) {
    this.props = { ...this.props, mask };
    return this;
  };

  Element.clipShape = function (clipShape) {
    this.props = { ...this.props, clipShape };
    return this;
  };

  Element.environment = function (environment) {
    this.props = { ...this.props, environment };
    return this;
  };

  Element.textContentType = function (textContentType) {
    this.props = { ...this.props, textContentType };
    return this;
  };

  Element.keyboardType = function (keyboardType) {
    this.props = { ...this.props, keyboardType };
    return this;
  };

  Element.textInputAutocapitalization = function (textInputAutocapitalization) {
    this.props = { ...this.props, textInputAutocapitalization };
    return this;
  };

  Element.autocorrectionDisabled = function (autocorrectionDisabled) {
    this.props = { ...this.props, autocorrectionDisabled };
    return this;
  };

  Element.resizable = function () {
    this.props = { ...this.props, resizable: true };
    return this;
  };

  Element.symbolRenderingMode = function (symbolRenderingMode) {
    this.props = { ...this.props, symbolRenderingMode };
    return this;
  };

  Element.fontSize = function (fontSize) {
    this.props = { ...this.props, fontSize };
    return this;
  };

  Element.fontWeight = function (fontWeight) {
    this.props = { ...this.props, fontWeight };
    return this;
  };

  Element.font = function (font) {
    this.props = { ...this.props, font };
    return this;
  };

  Element.italic = function (italic) {
    this.props = { ...this.props, italic };
    return this;
  };

  Element.strikethrough = function (strikethrough) {
    this.props = { ...this.props, strikethrough };
    return this;
  };

  Element.underline = function (underline) {
    this.props = { ...this.props, underline };
    return this;
  };

  Element.buttonStyle = function (buttonStyle) {
    this.props = { ...this.props, buttonStyle };
    return this;
  };

  Element.pickerStyle = function (pickerStyle) {
    this.props = { ...this.props, pickerStyle };
    return this;
  };

  Element.textFieldStyle = function (textFieldStyle) {
    this.props = { ...this.props, textFieldStyle };
    return this;
  };

  Element.listStyle = function (listStyle) {
    this.props = { ...this.props, listStyle };
    return this;
  };

  Element.sensoryFeedback = function (sensoryFeedback) {
    this.props = { ...this.props, sensoryFeedback };
    return this;
  };

  Element.labelIsHidden = function () {
    this.props = { ...this.props, labelIsHidden: true };
    return this;
  };

  Element.style = function (style: StyleProp<ViewStyle | TextStyle>) {
    this.props = { ...this.props, style };
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
