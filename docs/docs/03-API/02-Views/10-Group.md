---
---

A container for a collection of views that share the same modifiers.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<Group font="title" padding={5}>
  <Text>Hello</Text>
  <Text>World</Text>
  <Text>!</Text>
</Group>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Group {
    Text("Hello")
    Text("World")
    Text("!")
}
.font(.title)
.padding(5)
```

</TabItem>
</Tabs>

## Props

Group inherits all [View Modifiers](../modifiers#view-modifiers), [Text Modifiers](../modifiers#text-modifiers), and [Shape Modifiers](../modifiers#shape-modifiers) as props.
