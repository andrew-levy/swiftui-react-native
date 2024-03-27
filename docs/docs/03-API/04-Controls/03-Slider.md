---
---

A control for selecting a value from a bounded linear range of values.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const sliderValue = useBinding(0);
```

```tsx
<Slider value={sliderValue} range={[0, 10]} />
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

:::info
If you want the value to be an integer, you can either use the `step` prop (which doesn't animate smoothly), or round the value when you use it (which does animate smoothly).

```tsx
const roundedVal = Math.round($sliderValue.value);
```

:::

## Props

Slider inherits all [View Modifiers](../modifiers#view-modifiers) as props.

| prop       | description                                       | type                        | required | default     |
| ---------- | ------------------------------------------------- | --------------------------- | -------- | ----------- | --- |
| `value`    | The stepper value                                 | `Binding<number> \| number` | yes      | `undefined` |
| `step`     | The increment/decrement amount                    | `number`                    | no       | `1`         |
| `range`    | The range of values `[minNumber, maxNumber]`      | `[number, number]`          | no       | `[0, 100]`  |     |
| `onChange` | Function to execute when the slider value changes | `(v: number) => void`       | no       | `undefined` |
