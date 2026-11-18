import { Platform } from 'react-native';
import { NitroModules, type HybridObject } from 'react-native-nitro-modules';

/** Deferred so importing the library never touches native code. */
export function lazyHybridObject<T extends HybridObject<{}>>(name: string): () => T {
  let instance: T | undefined;
  return () => {
    if (instance === undefined) {
      if (Platform.OS !== 'ios') {
        throw new Error(
          `[swiftui-react-native] The native module "${name}" is only available on iOS.`
        );
      }
      instance = NitroModules.createHybridObject<T>(name);
    }
    return instance;
  };
}
