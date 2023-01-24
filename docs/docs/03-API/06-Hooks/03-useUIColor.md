---
---

The `useUIColor` hook returns a dynamic SwiftUI color palette based on the current color scheme. If you need to break out of the `swiftui-react-native` components but still need to access a `UIColor`, this object provides you with a collection of color values.

```typescript
function useUIColor(preferredColorScheme?: 'light' | 'dark'): typeof UIColor;
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

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

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
VStack {
  Text("Learn More")
}
.background(Color(.systemBlue))
```

</TabItem>

</Tabs>
