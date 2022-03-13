---
title: Hello World
---

### Let's make a simple hello world app using SwiftUI primitives.

First, if you want to take advantage of features like dynamic colors and environment values, you'll need to wrap your app in a `EnvironmentProvider` view. It's not necessary, but it makes it easy to implement dark mode with very little setup!

```tsx
// App.js

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

Next, lets use some commonly used primitives like `VStack`, `Image`, and `Text`. We'll display a smiling face icon and some text saying "Hello World" below it.

```tsx
// HelloWorld.js

import { VStack, Image, Text } from 'swiftui-react-native';

export default function HelloWorld() {
  return (
    <VStack spacing={5} frame={{ maxHeight: 'infinity' }}>
      <Image systemName="face.smiling" fontSize={50} />
      <Text font="title">Hello World!</Text>
    </VStack>
  );
}
```

<!-- Want to see how easy it is to implement dark mode? Since we already have an `EnvironmentProvider` wrapping our app, we have access to the color scheme environment value which defaults to light. Let's add two buttons to switch between light and dark mode.

```tsx
// HelloWorld.js

import {
  VStack,
  Image,
  Text,
  Button,
  useEnvironment,
} from 'swiftui-react-native';

export default function HelloWorld() {
  const [colorScheme] = useEnvironment('colorScheme');
  const $colorScheme = useBinding(colorScheme)
  return (
    <VStack spacing={5} frame={{ maxHeight: 'infinity' }}>
      <Image systemName="face.smiling" fontSize={50} />
      <Text font="title">Hello World!</Text>
      <Toggle isOn={$colorScheme} />
    </VStack>
  );
}
``` -->
