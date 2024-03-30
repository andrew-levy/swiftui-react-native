---
---

A rectangular shape view with uneven rounded corners.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<UnevenRoundedRectangle
  fill="green"
  cornerRadii={{
    topLeading: 10,
    topTrailing: 20,
    bottomLeading: 5,
    bottomTrailing: 0,
  }}
/>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
UnevenRoundedRectangle(cornerRadii: .init(topLeading: 10, topTrailing: 20, bottomLeading: 5, bottomTrailing: 0))
    .fill(Color.green)

```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<View
  style={{
    width: 100,
    height: 150,
    backgroundColor: 'green',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 0,
  }}
```

</TabItem>
</Tabs>

## Props

Ellipse inherits all [View Modifiers](../modifiers#full-list) as props.
