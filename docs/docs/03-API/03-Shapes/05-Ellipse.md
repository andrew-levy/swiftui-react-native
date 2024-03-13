---
---

A Ellipse shape view.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<Ellipse fill="systemRed" frame={{ width: 100, height: 150 }} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Ellipse()
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

Ellipse inherits all [View Modifiers](../modifiers#view-modifiers) and [Shape Modifiers](../modifiers#text-modifiers) as props.

:::info
The `frame` prop is required for Ellipse.
:::
