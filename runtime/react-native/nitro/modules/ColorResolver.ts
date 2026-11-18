import { Platform } from 'react-native';
import { lazyHybridObject } from '../createHybridObject';
import type { SwiftUIColorResolver } from '../specs/SwiftUIColorResolver.nitro';

const getResolver = lazyHybridObject<SwiftUIColorResolver>(
  'SwiftUIColorResolver'
);

/**
 * Resolves a SwiftUI color name (`"indigo"`, `"accentColor"`, `"secondary"`, ...) or a
 * CSS-style color string to a `#RRGGBBAA` hex string, synchronously.
 *
 * Useful for using SwiftUI's palette in React Native styles. Off iOS the input is
 * returned unchanged.
 */
export function resolveColor(color: string): string {
  if (Platform.OS !== 'ios') {
    return color;
  }
  return getResolver().getColor(color);
}
