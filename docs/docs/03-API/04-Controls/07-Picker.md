---
---

A control for selecting from a set of mutually exclusive values.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const selection = useBinding('Option 1');
```

```tsx
<Picker selection={selection}>
  <Text>Option 1</Text>
  <Text>Option 2</Text>
  <Text>Option 3</Text>
</Picker>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
@State var selection = ""
```

```swift
Picker("Select an option", selection: $selection) {
    Text("Option 1")
    Text("Option 2")
    Text("Option 3")
}
```

</TabItem>
</Tabs>

## Props

Toggle inherits all [View Modifiers](../modifiers#view-modifiers) as props.

| prop       | description                                       | type                        | required | default     |
| ---------- | ------------------------------------------------- | --------------------------- | -------- | ----------- |
| `isOn`     | The toggle value                                  | `BooleanBinding \| boolean` | yes      | `undefined` |
| `onChange` | Function to execute when the toggle value changes | `(v: boolean) => void`      | no       | `undefined` |
