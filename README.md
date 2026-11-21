<p align="center">
  <img src="https://swiftui.rit3zh.dev/assets/banner.png" alt="SwiftUI React Native" />
</p>

<p align="center">
  Real SwiftUI views in React Native.
  <br />
  <a href="https://swiftui.rit3zh.dev"><strong>Documentation</strong></a>
</p>

## Install

```sh
npm install swiftui-react-native react-native-nitro-modules
cd ios && pod install
```

Needs iOS, the New Architecture and React Native 0.80 or newer. With Expo, use a development build.

## Usage

```tsx
import { Text, VStack, compose } from 'swiftui-react-native';

export function Greeting() {
  return (
    <VStack spacing={8}>
      <Text modifiers={compose().font('title').bold()}>Hello</Text>
      <Text modifiers={compose().foregroundStyle('secondary')}>From SwiftUI</Text>
    </VStack>
  );
}
```

## Contributing

Most of the library is generated from Apple's SDK, so files marked `Do not edit` are overwritten on release. If a generated API is wrong or missing, please open an issue.

## License

MIT
