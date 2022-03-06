---
---

Provides global context to the app. Wrap your app in a `SwiftUIRoot` to access environment variables like `colorScheme`.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<SwiftUIRoot environment={{ colorScheme: 'dark', isLoggedIn: false }}>
  <MyApp />
</SwiftUIRoot>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
MyApp()
  .environment(.\colorScheme, .dark)
  .environment(.\isLoggedIn, false)
```

</TabItem>
</Tabs>

:::info
The `colorScheme` environment variable is always included whether you specify it or not (defaults to `'light'`).
:::
:::tip
Use the `useEnvironment` hook to access these values throughout the app.
:::

## Props

| prop          | description                                                           | type                                              | required | default                    |
| ------------- | --------------------------------------------------------------------- | ------------------------------------------------- | -------- | -------------------------- |
| `environment` | A key value map of environment variables to access throughout the app | `{ colorScheme: string, [key: string]: unknown }` | no       | `{ colorScheme: 'light' }` |
