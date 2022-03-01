---
---

The `useEnvironment` hook allows you to access your environment variables supplied to the `SwiftUIRoot` view.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
@Environment(\.isLoggedIn) var colorScheme
```

</TabItem>
</Tabs>

:::info
The `colorScheme` environment variable is always included whether you specify it or not.
:::

## TypeScript

You can supply the `useEnvironment` hook with generics to leverage types and intellisense

```tsx
const environemntVars = { isLoggedIn: false };
export type MyEnvs = typeof environemntVars;
```

```tsx
const [isLoggedIn, setIsLoggedIn] = useEnvironment<MyEnvs, boolean>(
  'isLoggedIn'
);
const [colorScheme, setColorScheme] = useEnvironment<MyEnvs, 'dark' | 'light'>(
  'colorScheme'
);
```
