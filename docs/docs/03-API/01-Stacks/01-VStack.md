---
---

A vertical stack with configurable alignment and spacing between child views.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<VStack alignment="leading" spacing={10}>
  <Text>Hello</Text>
  <Text>World</Text>
</VStack>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
VStack(alignment: .leading, spacing: 10) {
    Text("Hello")
    Text("World")
}
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<View style={{}}>
  <Text>Hello</Text>
  <Text>World</Text>
</View>
```

</TabItem>
</Tabs>
