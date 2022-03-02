---
title: Hello World
---

The first step to creating your first SwiftUI React Native app is to wrap your app in a `SwiftUIRoot` view.

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

import { HStack, Image, Text } from 'swiftui-react-native';

export default function HelloWorld() {
  return (
    <HStack spacing={5}>
      <Image systemName='face.smiling' frame={{ width: 100, height: 100}}>
      <Text font='title'>Hello World!</Text>
    </HStack>
  );
}
```
