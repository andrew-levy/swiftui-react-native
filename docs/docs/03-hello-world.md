---
title: Hello World
---

To get started, let's create a simple _Hello World_ app using common SwiftUI primitives. We'll display a smiley-face icon with some text below it.

```tsx
// App.tsx

import { VStack, Image, Text, Button } from 'swiftui-react-native';

export default function App() {
  return (
    <VStack spacing={5}>
      <Image systemName="face.smiling" fontSize={50} />
      <Text font="title">Hello World!</Text>
      <Button
        title="Press me"
        buttonStyle="bordered"
        action={() => console.log('pressed')}
      />
    </VStack>
  );
}
```
