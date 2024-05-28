---
---

A visual element that can be used to separate other content.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<VStack>
  <Text>Item 1</Text>
  <Divider />
  <Text>Item 2</Text>
  <Divider />
  <Text>Item 3</Text>
</VStack>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
VStack {
    Text("Item 1")
    Divider()
    Text("Item 2")
    Divider()
    Text("Item 3")
}
```

</TabItem>
</Tabs>

## Props

List inherits all [View Modifiers](../modifiers#full-list) as props.
