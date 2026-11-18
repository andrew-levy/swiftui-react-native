import type { HybridObject } from 'react-native-nitro-modules';

export interface SwiftUIColorResolver
  extends HybridObject<{ ios: 'swift' }> {
  getColor(color: string): string;
}
