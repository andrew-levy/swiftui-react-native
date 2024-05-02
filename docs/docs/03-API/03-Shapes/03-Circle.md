---
---

A circlular shape view.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<Circle fill="red" frame={{ width: 100, height: 100 }} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Circle()
    .fill(Color.red)
    .frame(width: 100, height: 100)
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<View
  style={{ width: 100, height: 100, backgroundColor: 'red', borderRadius: 50 }}
/>
```

</TabItem>
</Tabs>

## Props

Circle inherits all [View Modifiers](../modifiers#full-list) as props.
