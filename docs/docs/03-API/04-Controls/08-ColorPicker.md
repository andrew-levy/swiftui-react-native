---
---

A control used to select a color from the system color picker UI.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const color = useBinding('white');
```

```tsx
<ColorPicker selection={color} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
@State var color = Color.white
```

```swift
ColorPicker(selection: $color)
```

</TabItem>
</Tabs>

## Props

ColorPicker inherits all [View Modifiers](../modifiers#full-list) as props.

| prop        | description                                        | type                  | required | default     |
| ----------- | -------------------------------------------------- | --------------------- | -------- | ----------- |
| `selection` | The color value                                    | `Color`               | yes      | `undefined` |
| `onChange`  | Function to execute when a color selection is made | `(v: string) => void` | no       | `undefined` |
