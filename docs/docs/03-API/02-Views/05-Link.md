---
---

A control for navigating to a URL.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<Link destination="https://www.apple.com" title="Apple">
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Link("Apple", destination: URL(string: "https://www.apple.com"))
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<Button title="Apple" onPress={() => Linking.openURL("https://www.apple.com")}>
```

</TabItem>
</Tabs>

## Props

Link inherits all [View Modifiers](../modifiers#view-modifiers) and [Text Modifiers](../modifiers#text-modifiers) as props.
