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
  italic: (isActive?: Modifiers['italic']) => ElementWithModifiers;
  strikethrough: (
    isActive?: Modifiers['strikethrough']
  ) => ElementWithModifiers;
  underline: (isActive?: Modifiers['underline']) => ElementWithModifiers;
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
  fill: (color: Modifiers['fill']) => ElementWithModifiers;
  stroke: (stroke: Modifiers['stroke']) => ElementWithModifiers;
  redacted: (reason: Modifiers['redacted']) => ElementWithModifiers;
  ignoresSafeArea: (
    ignoresSafeArea: Modifiers['ignoresSafeArea']
  ) => ElementWithModifiers;
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
  Element.props._modifiers = [];
  Element.padding = function (value) {
    this.props._modifiers = [...this.props._modifiers, { padding: value }];
    return this;
  };
  Element.bold = function (isActive = true) {
    this.props._modifiers = [...this.props._modifiers, { bold: isActive }];
    return this;
  };
  Element.border = function ({ color, width }) {
    this.props._modifiers = [
      ...this.props._modifiers,
      { border: { color, width } },
    ];
    return this;
  };
  Element.imageScale = function (scale) {
    this.props._modifiers = [...this.props._modifiers, { imageScale: scale }];
    return this;
  };
  Element.frame = function (frame) {
    this.props._modifiers = [...this.props._modifiers, { frame }];
    return this;
  };

  Element.foregroundStyle = function (foregroundStyle) {
    this.props._modifiers = [...this.props._modifiers, { foregroundStyle }];
    return this;
  };

  Element.rotationEffect = function (rotationEffect) {
    this.props._modifiers = [...this.props._modifiers, { rotationEffect }];
    return this;
  };

  Element.scaleEffect = function (scaleEffect) {
    this.props._modifiers = [...this.props._modifiers, { scaleEffect }];
    return this;
  };

  Element.shadow = function (shadow) {
    this.props._modifiers = [...this.props._modifiers, { shadow }];
    return this;
  };

  Element.background = function (background) {
    this.props._modifiers = [...this.props._modifiers, { background }];
    return this;
  };

  Element.hidden = function () {
    this.props._modifiers = [...this.props._modifiers, { hidden: true }];
    return this;
  };

  Element.zIndex = function (zIndex) {
    this.props._modifiers = [...this.props._modifiers, { zIndex }];
    return this;
  };

  Element.opacity = function (opacity) {
    this.props._modifiers = [...this.props._modifiers, { opacity }];
    return this;
  };

  Element.tint = function (tint) {
    this.props._modifiers = [...this.props._modifiers, { tint }];
    return this;
  };

  Element.cornerRadius = function (cornerRadius) {
    this.props._modifiers = [...this.props._modifiers, { cornerRadius }];
    return this;
  };

  Element.position = function (position) {
    this.props._modifiers = [...this.props._modifiers, { position }];
    return this;
  };

  Element.offset = function (offset) {
    this.props._modifiers = [...this.props._modifiers, { offset }];
    return this;
  };

  Element.animation = function (animation) {
    this.props._modifiers = [...this.props._modifiers, { animation }];
    return this;
  };

  Element.contentTransition = function (contentTransition) {
    this.props._modifiers = [...this.props._modifiers, { contentTransition }];
    return this;
  };

  Element.blur = function (blur) {
    this.props._modifiers = [...this.props._modifiers, { blur }];
    return this;
  };

  Element.saturation = function (saturation) {
    this.props._modifiers = [...this.props._modifiers, { saturation }];
    return this;
  };

  Element.grayscale = function (grayscale) {
    this.props._modifiers = [...this.props._modifiers, { grayscale }];
    return this;
  };

  Element.brightness = function (brightness) {
    this.props._modifiers = [...this.props._modifiers, { brightness }];
    return this;
  };

  Element.contrast = function (contrast) {
    this.props._modifiers = [...this.props._modifiers, { contrast }];
    return this;
  };

  Element.blendMode = function (blendMode) {
    this.props._modifiers = [...this.props._modifiers, { blendMode }];
    return this;
  };

  Element.mask = function (mask) {
    this.props._modifiers = [...this.props._modifiers, { mask }];
    return this;
  };

  Element.clipShape = function (clipShape) {
    this.props._modifiers = [...this.props._modifiers, { clipShape }];
    return this;
  };

  Element.environment = function (environment) {
    this.props._modifiers = [...this.props._modifiers, { environment }];
    return this;
  };

  Element.textContentType = function (textContentType) {
    this.props._modifiers = [...this.props._modifiers, { textContentType }];
    return this;
  };

  Element.keyboardType = function (keyboardType) {
    this.props._modifiers = [...this.props._modifiers, { keyboardType }];
    return this;
  };

  Element.textInputAutocapitalization = function (textInputAutocapitalization) {
    this.props._modifiers = [
      ...this.props._modifiers,
      { textInputAutocapitalization },
    ];
    return this;
  };

  Element.autocorrectionDisabled = function (autocorrectionDisabled) {
    this.props._modifiers = [
      ...this.props._modifiers,
      { autocorrectionDisabled },
    ];
    return this;
  };

  Element.resizable = function () {
    this.props._modifiers = [...this.props._modifiers, { resizable: true }];
    return this;
  };

  Element.symbolRenderingMode = function (symbolRenderingMode) {
    this.props._modifiers = [...this.props._modifiers, { symbolRenderingMode }];
    return this;
  };

  Element.fontSize = function (fontSize) {
    this.props._modifiers = [...this.props._modifiers, { fontSize }];
    return this;
  };

  Element.fontWeight = function (fontWeight) {
    this.props._modifiers = [...this.props._modifiers, { fontWeight }];
    return this;
  };

  Element.font = function (font) {
    this.props._modifiers = [...this.props._modifiers, { font }];
    return this;
  };

  Element.italic = function (italic = true) {
    this.props._modifiers = [...this.props._modifiers, { italic }];
    return this;
  };

  Element.strikethrough = function (strikethrough = true) {
    this.props._modifiers = [...this.props._modifiers, { strikethrough }];
    return this;
  };

  Element.underline = function (underline = true) {
    this.props._modifiers = [...this.props._modifiers, { underline }];
    return this;
  };

  Element.buttonStyle = function (buttonStyle) {
    this.props._modifiers = [...this.props._modifiers, { buttonStyle }];
    return this;
  };

  Element.pickerStyle = function (pickerStyle) {
    this.props._modifiers = [...this.props._modifiers, { pickerStyle }];
    return this;
  };

  Element.textFieldStyle = function (textFieldStyle) {
    this.props._modifiers = [...this.props._modifiers, { textFieldStyle }];
    return this;
  };

  Element.listStyle = function (listStyle) {
    this.props._modifiers = [...this.props._modifiers, { listStyle }];
    return this;
  };

  Element.sensoryFeedback = function (sensoryFeedback) {
    this.props._modifiers = [...this.props._modifiers, { sensoryFeedback }];
    return this;
  };

  Element.labelIsHidden = function () {
    this.props._modifiers = [...this.props._modifiers, { labelIsHidden: true }];
    return this;
  };

  Element.fill = function (color) {
    this.props._modifiers = [...this.props._modifiers, { fill: color }];
    return this;
  };

  Element.stroke = function (stroke) {
    this.props._modifiers = [...this.props._modifiers, { stroke }];
    return this;
  };

  Element.redacted = function (reason) {
    this.props._modifiers = [...this.props._modifiers, { redacted: reason }];
    return this;
  };

  Element.ignoresSafeArea = function (ignoresSafeArea) {
    this.props._modifiers = [...this.props._modifiers, { ignoresSafeArea }];
    return this;
  };

  Element.style = function (style: StyleProp<ViewStyle | TextStyle>) {
    this.props.style = style;
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
