import { ReactNode } from 'react';
import { Alert } from '../alert';
import { BooleanBinding } from '../binding';
import { Border } from '../border';
import { UIColor } from '../colors';
import { BlendMode, ClipShape } from '../filters';
import { Fonts } from '../fonts';
import { Frame } from '../frame';
import { Padding } from '../padding';
import { Shadow } from '../shadow';
import { Rotation } from '../transform';

export type Modifiers = {
  // View
  padding?: Padding;
  border?: Border;
  foregroundStyle?: UIColor | UIColor[];
  rotationEffect?: Rotation;
  scaleEffect?: number;
  shadow?: Shadow;
  background?: UIColor;
  hidden?: boolean;
  frame?: Frame;
  zIndex?: number;
  opacity?: number;
  tint?: UIColor;
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
  // Lifecycle - todo
  onAppear?: () => void;
  onDisappear?: () => void;
  // Alert  - todo
  alert?: Alert;
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
