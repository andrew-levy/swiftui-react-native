---
---

A control that performs increment and decrement actions.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
// Create a binding value
const $stepperVal = useBinding(0);
```

```tsx
// Pass it to the view
<Stepper value={$stepperVal} step={2} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
@State var stepperVal = ""
```

```swift
Stepper(value: $stepperVal, step: 2)
```

</TabItem>
</Tabs>
