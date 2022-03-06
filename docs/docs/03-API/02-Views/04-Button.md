---
---

A control that initiates an action.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<Button action={doSomething}>
    <Text fontWeight="bold">Click the cool button</Text>
</Button>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Button(action: doSomething) {
    Text("Click the cool button")
        .bold()
}
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<TouchableOpacity onPress={doSomething}>
    <Text style={{ fontWeight: 'bold' }}>Click the cool button</Text>
</TouchableOpacity>
```

</TabItem>
</Tabs>

## Props