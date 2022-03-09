---
---

The `useEnvironment` hook allows you to access your environment values supplied to the `EnvironmentProvider` view.

```typescript
function useEnvironment<T, V>(
  key: EnvironmentKeys<T>
): readonly [V, (value: V) => void];
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const [colorScheme, setColorScheme] = useEnvironment('colorScheme');
const [isLoggedIn, setIsLoggedIn] = useEnvironment('isLoggedIn');
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
@Environment(\.colorScheme) var colorScheme
@Environment(\.isLoggedIn) var isLoggedIn
```

</TabItem>
</Tabs>

:::info
The `colorScheme` environment value is always included whether you specify it or not.
:::

## TypeScript

You can supply the `useEnvironment` hook with generics to leverage types and intellisense

```tsx
// App.tsx

import { EnvironmentProvider } from 'swiftui-react-native';
import SomeComponent from './SomeComponent';

const environemntVars = { isLoggedIn: false };
export type MyEnvs = typeof environemntVars;

export default function App() {
  return (
    <EnvironmentProvider environment={environmentVars}>
      <SomeComponent />
    </EnvironmentProvider>
  );
}
```

```tsx
// SomeComponent.tsx

import { VStack, Text, useEnvironment } from 'swiftui-react-native';
import type { MyEnvs } from './App';

type ColorScheme = 'light' | 'dark';

export default function SomeComponent() {
  const [colorScheme, setColorScheme] = useEnvironment<MyEnvs, ColorScheme>(
    'colorScheme'
  );
  const [isLoggedIn, setIsLoggedIn] = useEnvironment<MyEnvs, boolean>(
    'isLoggedIn'
  );
  return (
    <VStack>
      <Text>Current Color Scheme: {colorScheme}</Text>
      <Text>
        {isLoggedIn ? 'User is logged in 🙂' : 'User is not logged in 🙁'}
      </Text>
    </VStack>
  );
}
```
