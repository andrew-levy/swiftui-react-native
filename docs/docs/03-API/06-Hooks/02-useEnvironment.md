---
---

The `useEnvironment` hook allows you to access your environment values provided by the `EnvironmentProvider`.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
