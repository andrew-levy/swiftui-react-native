import { type ReactNode } from 'react';
import { type BooleanBinding } from '../binding';
import { type Border } from '../border';
import { type Color } from '../colors';
import { type BlendMode, type ClipShape } from '../filters';
import { type Fonts } from '../fonts';
import { type Frame } from '../frame';
import { type Padding } from '../padding';
import { type Shadow } from '../shadow';
import { type Rotation } from '../transform';

export type Modifiers = {
  // View
  padding?: Padding;
  border?: Border;
  foregroundStyle?: Color | Color[];
  rotationEffect?: Rotation;
  scaleEffect?: number;
  shadow?: Shadow;
  background?: Color;
  hidden?: boolean;
  frame?: Frame;
  zIndex?: number;
  opacity?: number;
  tint?: Color;
  cornerRadius?: number;
  position?: { x: number; y: number };
  offset?: { x: number; y: number };
  // Filter
  blur?: number;
  saturation?: number;
  grayscale?: number;
  brightness?: number;
  contrast?: number;
  blendMode?: BlendMode;
  mask?: string;
  clipShape?: ClipShape;
  // Context
  environment?: {
    colorScheme: 'light' | 'dark';
  };
  // Image
  resizable?: boolean;
  imageScale?: 'small' | 'medium' | 'large';
  // Text
  fontWeight?:
    | 'ultralight'
    | 'thin'
    | 'light'
    | 'regular'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'heavy'
    | 'black';
  font?: keyof typeof Fonts;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  // Style Variants
  buttonStyle?: 'bordered' | 'borderless' | 'plain' | 'borderedProminent';
  pickerStyle?: 'wheel' | 'segmented' | 'menu';
  textFieldStyle?: 'plain' | 'roundedBorder';
  listStyle?: 'inset' | 'grouped' | 'plain' | 'insetGrouped';
  // Sheet
  sheet?: {
    isPresented: boolean | BooleanBinding;
    content: ReactNode;
    onDismiss?: () => void;
  };
  // presentationCornerRadius?: number;
  // presentationDetents?: (
  //   | 'medium'
  //   | 'large'
  //   | { fraction: number }
  //   | { height: number }
  // )[];
  // Haptics
  sensoryFeedback?: {
    feedback:
      | 'warning'
      | 'error'
      | 'success'
      | 'alignment'
      | 'decrease'
      | 'impact'
      | 'increase'
      | 'levelChange'
      | 'selection'
      | 'start'
      | 'stop';
    trigger: any;
  };
  // List
  scrollDisabled?: boolean;
  // Lifecycle - todo
  onAppear?: () => void;
  onDisappear?: () => void;
  // Alert  - todo
  // alert?: Alert;
};

export type WithChildren<T> = T & {
  children?: ReactNode;
};

export type NativeModifiersProp = { [key: string]: any };

/**
 * Maps a modifiers object or function to an array of native modifiers, with
 * the order being preserved.
 */
export function mapToNativeModifiers(modifiers: Modifiers) {
  if (Array.isArray(modifiers)) {
    return modifiers;
  }
  let result: NativeModifiersProp[] = [];
  result = Object.keys(modifiers || {}).map((key) => {
    if (key === 'sheet') {
      const { content, ...rest } = modifiers[key];
      console.log('rest', rest);
      return { [key]: rest };
    }
    return { [key]: modifiers[key] };
  });
  return result;
}

// TODO: this assumes {} need to assume [{}] for multiple modifiers
export function getSizeFromModifiers(
  modifiers: Modifiers,
  defaultSize: { width: number; height: number }
) {
  let width = modifiers.frame?.width || defaultSize.width;
  let height = modifiers.frame?.height || defaultSize.height;

  if (typeof width === 'number' && typeof height === 'number') {
    if (typeof modifiers.padding === 'number') {
      width += modifiers.padding;
      height += modifiers.padding;
    } else if (typeof modifiers.padding === 'boolean') {
      width += 8;
      height += 8;
    } else {
      const { all, horizontal, vertical, top, bottom, leading, trailing } =
        modifiers.padding || {
          all: 0,
          horizontal: 0,
          vertical: 0,
          top: 0,
          bottom: 0,
          leading: 0,
          trailing: 0,
        };
      width += all;
      height += all;
      width += horizontal;
      height += vertical;
      height += top;
      height += bottom;
      width += leading;
      width += trailing;
    }

    if (modifiers.border) {
      width += modifiers.border.width;
      height += modifiers.border.width;
    }
  }
  return { width, height };
}
