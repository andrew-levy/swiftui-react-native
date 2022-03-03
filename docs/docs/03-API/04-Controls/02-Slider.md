---
---

A control for selecting a value from a bounded linear range of values.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
// Create a binding value
const $sliderValue = useBinding(0);
```

```tsx
// Pass it to the view
<Slider value={$sliderValue} range={[0, 10]} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
@State var sliderValue = ""
```

```swift
Slider(value: $sliderValue, in: 0...10)
```

</TabItem>
</Tabs>
