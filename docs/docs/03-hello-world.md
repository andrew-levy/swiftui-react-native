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

Next, let's use some commonly used primitives like `VStack`, `Image`, and `Text`. We'll display a smiling face icon and some text saying "Hello World" below it. Since we already wrapped our app in an `EnvironmentProvider`, we can easily take advantage of the `colorScheme` environment value (this is automatically exposed to us). Let's add a button to switch between light and dark mode.

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
  const [colorScheme, setColorScheme] = useEnvironment('colorScheme');
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };
  return (
    <VStack spacing={5} frame={{ maxHeight: 'infinity' }}>
      <Image systemName="face.smiling" fontSize={50} />
      <Text font="title">Hello World!</Text>
      <Button title={`${colorScheme} mode`} action={toggleColorScheme} />
    </VStack>
  );
}
```
