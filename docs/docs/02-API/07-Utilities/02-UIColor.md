---
---

SwiftUI color palette object. If you need to break out of the `swiftui-react-native` components but still need to access a `UIColor`, this object provides light and dark color palettes.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const { colorScheme } = useColorScheme();
```

```tsx
<View style={{ backgroundColor: UIColor[colorScheme].systemBlue }}>
  <Text>Learn More</Text>
</View>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
VStack {
  Text("Learn More")
}.background(Color(.systemBlue))
```

</TabItem>

</Tabs>
