---
---

The `useColorScheme` hook returns the current color scheme and a function to set the color scheme.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const { colorScheme, setColorSceheme } = useColorScheme();
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

Create a state variable

```swift
@Environment(\.colorScheme) var colorScheme
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
const colorScheme = useColorScheme();
```

</TabItem>
</Tabs>
