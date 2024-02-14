import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Alert } from '../alert';
import { Border } from '../border';
import { UIColor } from '../colors';
import { FontWeights, Fonts } from '../fonts';
import { Frame, ShapeFrame } from '../frame';
import { Padding } from '../padding';
import { Shadow } from '../shadow';
import { Rotation } from '../transform';

// Alert might be possible if we can commuinicate which action was taken back to
// the js so that we can trigger the right function.

export type Modifiers = {
  alert?: Alert; // propably cant do this
  backgroundColor?: UIColor; // rename?
  padding?: Padding; // good
  cornerRadius?: number; // removed in swiftui?
  rotationEffect?: Rotation; // check
  scaleEffect?: number; // check
  shadow?: Shadow; // good but check
  border?: Border; // good
  opacity?: number; // good
  frame?: Frame; // good but check
  zIndex?: number; // good but check
  preferredColorScheme?: 'light' | 'dark'; // check
  style?: StyleProp<ViewStyle>;
  blur?: number; // check
  tint?: UIColor; // check
  onAppear?: () => void; // should we move this to swiftui? i think yes
  onDisappear?: () => void; // should we move this to swiftui? i think yes
};

export type TextModifiers = {
  font?: keyof typeof Fonts; // swiftui
  fontWeight?: keyof typeof FontWeights; // swiftui but check
  fontSize?: number; // swiftui but check
  foregroundColor?: UIColor; // this changed to foregroundStyle in swiftui
  customFont?: string; // check
  bold?: boolean; // swiftui
  italic?: boolean; // swiftui
  strikethrough?: // swiftui
  boolean | { color?: UIColor; pattern?: 'solid' | 'dot' | 'dash' };
  underline?: boolean | { color?: UIColor; pattern?: 'solid' | 'dot' | 'dash' }; // swiftui
};

export type ShapeModifiers = Omit<Modifiers, 'backgroundColor' | 'frame'> & {
  fill?: UIColor; // swiftui
  frame: ShapeFrame; // swiftui
};

export type WithChildren<T> = T & {
  children?: ReactNode;
};

export type ModifiersBuilder = Omit<InternalModifiersBuilder, 'build'>;
export type NativeModifiersProp = { [key: string]: any };
export type ModifiersFunctionProp = (
  builder: ModifiersBuilder
) => ModifiersBuilder;
export type ModifierObjectProp = Modifiers;
export type ModifiersProp = ModifiersFunctionProp | ModifierObjectProp;

/**
 * A builder class for creating native modifiers.
 */

export class InternalModifiersBuilder {
  private modifiers: { [key: string]: any }[] = [];

  build() {
    return this.modifiers;
  }

  alert(alert: Alert) {
    this.modifiers.push({ alert });
    return this;
  }

  bold(isActive: boolean = true) {
    this.modifiers.push({ bold: isActive });
    return this;
  }

  border(border: Border) {
    this.modifiers.push({ border });
    return this;
  }

  padding(padding: Padding) {
    this.modifiers.push({ padding });
    return this;
  }

  frame(frame: Frame) {
    this.modifiers.push({ frame });
    return this;
  }

  fill(fill: UIColor) {
    this.modifiers.push({ fill });
    return this;
  }

  stroke(stroke: UIColor, lineWidth: number) {
    this.modifiers.push({ stroke: { color: stroke, lineWidth } });
    return this;
  }

  background(background: UIColor) {
    this.modifiers.push({ background });
    return this;
  }

  scaleEffect(scaleEffect: number) {
    this.modifiers.push({ scaleEffect });
    return this;
  }

  imageScale(scale: 'small' | 'medium' | 'large') {
    this.modifiers.push({ imageScale: scale });
    return this;
  }

  preferredColorScheme(preferredColorScheme: 'light' | 'dark') {
    this.modifiers.push({ preferredColorScheme });
    return this;
  }

  pickerStyle(pickerStyle: 'wheel' | 'segmented' | 'menu') {
    this.modifiers.push({ pickerStyle });
    return this;
  }

  foregroundStyle(foregroundStyle: UIColor | UIColor[]) {
    this.modifiers.push({ foregroundStyle });
    return this;
  }

  blur(blur: number) {
    this.modifiers.push({ blur });
    return this;
  }
}

/**
 * Builds an array of native modifiers from a modifiers function.
 */
export function buildModifiers(
  modifiers: (builder: ModifiersBuilder) => ModifiersBuilder
) {
  if (!modifiers) return [];
  const builder = new InternalModifiersBuilder();
  return (modifiers(builder) as InternalModifiersBuilder).build();
}

/**
 * Applies styles from a modifiers prop to a style object. This is used for
 * components that aren't implemented in SwiftUI yet.
 */
export function applyStylesFromModifierProps(
  modifiers: [{ [key: string]: any }]
) {
  const result = {};
  // [ { alert: Alert }, { padding: Padding }, { frame: Frame }]
  for (const modifier of modifiers) {
    const key = Object.keys(modifier)[0];
    const value = modifier[key];
    switch (key) {
      case 'padding':
        // do something
        break;
      default:
        break;
    }
  }
}

/**
 * Maps a modifiers object or function to an array of native modifiers, with
 * the order being preserved.
 */
export function mapToNativeModifiers(modifiers: ModifiersProp | Modifiers) {
  if (Array.isArray(modifiers)) {
    return modifiers;
  }
  let result: NativeModifiersProp[] = [];
  if (typeof modifiers === 'function') {
    result = buildModifiers(modifiers);
  } else {
    result = Object.keys(modifiers || {}).map((key) => {
      return { [key]: modifiers[key] };
    });
  }
  return result;
}
