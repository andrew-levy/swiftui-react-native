---
---

A capsule shape view.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<Capsule fill="red" frame={{ width: 100, height: 150 }} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Capsule()
    .fill(Color.red)
    .frame(width: 100, height: 150)
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<View
  style={{ width: 100, height: 150, backgroundColor: 'red', borderRadius: 10 }}
/>
```

</TabItem>
</Tabs>

## Props

Capsule inherits all [View Modifiers](../modifiers#full-list) as props.
