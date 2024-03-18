---
---

A control that toggles between on and off states.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const isOn = useBinding(false);
```

```tsx
<Toggle isOn={isOn} />
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

Toggle inherits all [View Modifiers](../modifiers#view-modifiers) as props.

| prop       | description                                       | type                   | required | default     |
| ---------- | ------------------------------------------------- | ---------------------- | -------- | ----------- |
| `isOn`     | The toggle value                                  | `BooleanBinding`       | yes      | `undefined` |
| `tint`     | The "on" toggle color                             | `Color`                | no       | `undefined` |
| `onChange` | Function to execute when the toggle value changes | `(v: boolean) => void` | no       | `undefined` |
