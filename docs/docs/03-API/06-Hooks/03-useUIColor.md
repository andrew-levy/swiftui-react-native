---
---

A hook that returns a dynamic SwiftUI color palette based on the current `colorScheme`. If you need to break out of the `swiftui-react-native` components but still need to access a `UIColor`, this object provides you with a collection of color values.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
// Get the color palette (light or dark based on current color scheme)
const UIColor = useUIColor();
```

```tsx
// Use it!
<View style={{ backgroundColor: UIColor.systemBlue }}>
  <Text>Learn More</Text>
</View>
```

```tsx
// You can also override the `colorScheme` by passing in an optional preferred color scheme argument
const UIColor = useUIColor('dark');
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
VStack {
  Text("Learn More")
}
.background(Color(UIColor(.systemBlue))
```

</TabItem>

</Tabs>
