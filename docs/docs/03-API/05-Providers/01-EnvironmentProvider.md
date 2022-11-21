---
---

Provides global context to environment values. Wrap your app in a `EnvironmentProvider` to access environment values like `colorScheme`.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<EnvironmentProvider colorScheme="dark">
  <MyApp />
</EnvironmentProvider>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
MyApp()
  .environment(.\colorScheme, .dark)
```

</TabItem>
</Tabs>

:::info
If not provided, the `colorScheme` value will default to your device's system color scheme.
:::
:::tip
Use the `useEnvironment` hook to access these values throughout the app.
:::

## Props

| prop          | description                         | type                | required | default             |
| ------------- | ----------------------------------- | ------------------- | -------- | ------------------- |
| `colorScheme` | The default color scheme of the app | `"light" or "dark"` | no       | System Color Scheme |
| `locale`      | The default locale of the app       | `string`            | no       | `"en"`              |
