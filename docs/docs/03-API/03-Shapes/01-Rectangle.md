---
---

A rectangular shape view.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<Rectangle fill="systemRed" frame={{ width: 100, height: 150 }} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Rectangle()
    .fill(Color.red)
    .frame(width: 100, height: 150)
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<View style={{ width: 100, height: 150, backgroundColor: 'red' }} />
```

</TabItem>
</Tabs>

## Props

Rectangle inherits all [View Modifiers](../modifiers#view-modifiers) and [Shape Modifiers](../modifiers#text-modifiers).

:::info
The `frame` prop is required for Rectange.
:::
