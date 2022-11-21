---
title: Hello World
---

To get started, let's create a simple _Hello World_ app using common SwiftUI primitives. We'll display a smiley-face icon with some text below it.

```tsx
// HelloWorld.jsx

import { VStack, Image, Text, Button } from 'swiftui-react-native';

export default function HelloWorld() {
  return (
    <VStack spacing={5}>
      <Image systemName="face.smiling" fontSize={50} />
      <Text font="title">Hello World!</Text>
    </VStack>
  );
}
```

If you want to take advantage of features like dynamic colors and environment values, you'll need to wrap your app in a `EnvironmentProvider` view. It's not necessary, but it makes it easy to implement dark mode with very little setup!

```tsx
// App.jsx

import { EnvironmentProvider } from 'swiftui-react-native';
import HelloWorld from './HelloWorld';

export default function App() {
  return (
    <EnvironmentProvider>
      <HelloWorld />
    </EnvironmentProvider>
  );
}
```

```tsx
// HelloWorld.jsx

import {
  VStack,
  Image,
  Text,
  Button,
  useEnvironment,
} from 'swiftui-react-native';

export default function HelloWorld() {
  const { colorScheme, setValues } = useEnvironment();
  return (
    <VStack spacing={5}>
      <Image systemName="face.smiling" fontSize={50} />
      <Text font="title">Hello World!</Text>
      <Button
        title={`${colorScheme} mode`}
        action={() => {
          setValues({
            colorScheme: colorScheme === 'light' ? 'dark' : 'light',
          });
        }}
      />
    </VStack>
  );
}
```
