---
title: Hello World
---

Let's make a simple hello world app using SwiftUI primitives. If you want to take advantage of features like dynamic colors and environment values, you'll need to wrap your app in a `SwiftUIRoot` view.

```tsx
// App.js

import { SwiftUIRoot } from 'swiftui-react-native';
import HelloWorld from './HelloWorld';

export default function App() {
  return (
    <SwiftUIRoot>
      <HelloWorld />
    </SwiftUIRoot>
  );
}
```

```tsx
// HelloWorld.js

import { VStack, Image, Text } from 'swiftui-react-native';

export default function HelloWorld() {
  return (
    <VStack spacing={5}>
      <Image systemName="face.smiling" fontSize={50} />
      <Text font="title">Hello World!</Text>
    </VStack>
  );
}
```
