---
---

A control that performs increment and decrement actions.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const stepperVal = useBinding(0);
```

```tsx
<Stepper value={stepperVal} step={2} />
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

## Props

Stepper inherits all [View Modifiers](../modifiers#full-list) as props.

| prop       | description                                        | type                        | required | default     |
| ---------- | -------------------------------------------------- | --------------------------- | -------- | ----------- |
| `value`    | The stepper value                                  | `Binding<number> \| number` | yes      | `undefined` |
| `step`     | The increment/decrement amount                     | `number`                    | no       | `1`         |
| `range`    | The range of values `[minNumber, maxNumber]`       | `[number, number]`          | no       | `[0, 10]`   |
| `onChange` | Function to execute when the stepper value changes | `(v: number) => void`       | no       | `undefined` |
