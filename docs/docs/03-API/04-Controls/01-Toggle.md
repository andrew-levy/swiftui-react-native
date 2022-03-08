---
---

A control that toggles between on and off states.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
// Create a binding value
const $isOn = useBinding(false);
```

```tsx
// Pass it to the view
<Toggle isOn={$isOn} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
@State var isOn = ""
```

```swift
Toggle(isOn: $isOn)
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
const [isOn, setIsOn] = useState(false);
```

```tsx
<Switch value={isOn} onChange={(v) => setIsOn(!v)}>
```

</TabItem>
</Tabs>

## Props

Toggle inherits all `Modifiers` as props.

| prop       | description                                       | type                   | required | default     |
| ---------- | ------------------------------------------------- | ---------------------- | -------- | ----------- |
| `isOn`     | The toggle binding                                | `BooleanBinding`       | yes      | `undefined` |
| `tint`     | The "on" toggle color                             | `UIColor`              | no       | `undefined` |
| `onChange` | Function to execute when the toggle value changes | `(v: boolean) => void` | no       | `undefined` |
