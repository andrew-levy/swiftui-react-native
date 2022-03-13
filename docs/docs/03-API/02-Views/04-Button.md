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

Button inherits all [View Modifiers](../modifiers#view-modifiers) as props.

| prop       | description                                               | type         | required | default     |
| ---------- | --------------------------------------------------------- | ------------ | -------- | ----------- |
| `title`    | A view that describes the purpose of the button’s action. | `string`     | yes      | `undefined` |
| `action`   | The action to perform when the user triggers the button.  | `() => void` | yes      | `undefined` |
| `disabled` | The action to perform when the user triggers the button.  | `boolean`    | no       | `undefined` |
