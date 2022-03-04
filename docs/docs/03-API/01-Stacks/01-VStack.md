---
---

A view that arranges its children vertically.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

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
<View>
  <Text>Hello</Text>
  <Text style={{ marginTop: 10 }}>World</Text>
</View>
```

</TabItem>
</Tabs>
