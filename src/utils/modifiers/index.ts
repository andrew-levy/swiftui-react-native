import { type ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { getValueOrBinding } from '../binding';
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
  animation?: {
    type:
      | 'spring'
      | 'easeIn'
      | 'easeOut'
      | 'easeInOut'
      | 'linear'
      | 'interpolatingSpring'
      | 'bouncy'
      | 'smooth'
      | 'default';
    value: any;
  };
  contentTransition?:
    | 'numericText'
    | 'opacity'
    | 'identity'
    | 'interpolate'
    | 'symbolEffect';
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
  // TextField
  textContentType?:
    | 'name'
    | 'namePrefix'
    | 'givenName'
    | 'middleName'
    | 'familyName'
    | 'nameSuffix'
    | 'nickname'
    | 'jobTitle'
    | 'organizationName'
    | 'location'
    | 'fullStreetAddress'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'addressCity'
    | 'addressState'
    | 'addressCityAndState'
    | 'sublocality'
    | 'countryName'
    | 'postalCode'
    | 'telephoneNumber'
    | 'emailAddress'
    | 'URL'
    | 'creditCardNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode'
    | 'shipmentTrackingNumber'
    | 'flightNumber'
    | 'dateTime'
    | 'birthdate'
    | 'birthdateDay'
    | 'birthdateMonth'
    | 'birthdateYear'
    | 'creditCardSecurityCode'
    | 'creditCardName'
    | 'creditCardGivenName'
    | 'creditCardMiddleName'
    | 'creditCardFamilyName'
    | 'creditCardExpiration'
    | 'creditCardExpirationMonth'
    | 'creditCardExpirationYear'
    | 'creditCardType';

  keyboardType?:
    | 'numberPad'
    | 'phonePad'
    | 'namePhonePad'
    | 'emailAddress'
    | 'decimalPad'
    | 'twitter'
    | 'webSearch'
    | 'asciiCapableNumberPad'
    | 'numbersAndPunctuation'
    | 'URL'
    | 'asciiCapable'
    | 'default';

  textInputAutocapitalization?: 'never' | 'words' | 'sentences' | 'characters';
  autocorrectionDisabled?: boolean;

  // Image
  resizable?: boolean;
  imageScale?: 'small' | 'medium' | 'large';
  symbolRenderingMode?:
    | 'palette'
    | 'monochrome'
    | 'hierarchical'
    | 'multicolor';
  // Text
  fontSize?: number;
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
  // alert?: Alert;
  // Sheet
  // sheet?: {
  //   isPresented: boolean | BooleanBinding;
  //   content: ReactNode;
  //   onDismiss?: () => void;
  // };
  // presentationCornerRadius?: number;
  // presentationDetents?: (
  //   | 'medium'
  //   | 'large'
  //   | { fraction: number }
  //   | { height: number }
  // )[];
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
      const { content, isPresented, ...rest } = modifiers[key];
      return {
        [key]: { ...rest, isPresented: getValueOrBinding(isPresented) },
      };
    }
    return { [key]: modifiers[key] };
  });
  return result;
}

// TODO: this assumes {} need to assume [{}] for multiple modifiers
export function getSizeFromModifiers(
  modifiers: Modifiers,
  defaultSize?: { width: number; height: number }
) {
  const styles: ViewStyle = {};

  let width = modifiers.frame?.width || defaultSize?.width;
  let height = modifiers.frame?.height || defaultSize?.height;

  if (width) {
    styles.width = width;
  }
  if (height) {
    styles.height = height;
  }

  if (typeof modifiers.padding === 'number') {
    styles.padding = modifiers.padding;
  } else if (typeof modifiers.padding === 'boolean') {
    styles.padding = modifiers.padding ? 8 : 0;
  } else {
    if (modifiers.padding?.all) {
      styles.padding = modifiers.padding.all;
    }

    if (modifiers.padding?.horizontal) {
      styles.paddingHorizontal = modifiers.padding.horizontal;
    }
    if (modifiers.padding?.vertical) {
      styles.paddingVertical = modifiers.padding.vertical;
    }
    if (modifiers.padding?.top) {
      styles.paddingTop = modifiers.padding.top;
    }
    if (modifiers.padding?.bottom) {
      styles.paddingBottom = modifiers.padding.bottom;
    }
    if (modifiers.padding?.leading) {
      styles.paddingLeft = modifiers.padding.leading;
    }
    if (modifiers.padding?.trailing) {
      styles.paddingRight = modifiers.padding.trailing;
    }
  }

  return styles;
}
