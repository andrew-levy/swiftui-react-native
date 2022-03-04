---
---

A flexible space that expands along the major axis of its containing stack layout.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<HStack>
  <Text>Hello</Text>
  <Spacer />
  <Text>World</Text>
</HStack>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
HStack {
    Text("Hello")
    Spacer()
    Text("World")
}
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<View
  style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  }}
>
  <Text>Hello</Text>
  <Text>World</Text>
</View>
```

</TabItem>
</Tabs>
