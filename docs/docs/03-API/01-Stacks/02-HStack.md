---
---

A view that arranges its children horizontally.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<HStack alignment="top" spacing={10}>
  <Text>Hello</Text>
  <Text>World</Text>
</HStack>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
HStack(alignment: .top, spacing: 10) {
    Text("Hello")
    Text("World")
}
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<View style={{ flexDirection: 'row', jusitfyContent: 'flex-start' }}>
  <Text>Hello</Text>
  <Text style={{ marginLeft: 10 }}>World</Text>
</View>
```

</TabItem>
</Tabs>
