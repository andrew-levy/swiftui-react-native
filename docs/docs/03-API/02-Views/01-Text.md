---
---

A view that displays text.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<Text font="largeTitle">Hello</Text>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Text("Hello").font(.largeTitle)
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<Text style={{ fontWeight: 'bold', fontSize: 34 }}>Hello</Text>
```

</TabItem>
</Tabs>

## Props

Text inherits all [View Modifiers](../08-modifiers.md#full-list) as props.
