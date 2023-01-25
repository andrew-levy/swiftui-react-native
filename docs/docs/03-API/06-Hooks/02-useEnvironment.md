---
---

The `useEnvironment` hook allows you to access your environment values provided by the `EnvironmentProvider`.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Supported Environment Values

- `colorScheme`: Current color scheme of the app.
- `locale`: Current locale of the app.

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const { colorScheme } = useEnvironment();
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
@Environment(\.colorScheme) var colorScheme
```

</TabItem>
</Tabs>
