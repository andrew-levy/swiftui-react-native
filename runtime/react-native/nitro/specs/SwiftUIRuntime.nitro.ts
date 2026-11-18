import type { HybridObject } from 'react-native-nitro-modules';

export interface SwiftUIRuntime extends HybridObject<{ ios: 'swift' }> {
  call(handle: string, method: string, argumentsJSON: string): Promise<string>;

  evaluate(type: string, valueJSON: string, member: string, argumentsJSON: string): string;
}
