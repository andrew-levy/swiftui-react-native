---
---

Provides global context to the app. Wrap your app in a `SwiftUIRoot` to access environment variables like `colorScheme`.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

```

</TabItem>

</Tabs>
