---
---

A control for selecting a value from a bounded linear range of values.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const $sliderValue = useBinding(0);
```

```tsx
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

## Props

Slider inherits all [View Modifiers](../modifiers#view-modifiers) as props.

| prop            | description                                                                                                                                                                                    | type                  | required | default       |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------- | ------------- |
| `value`         | The stepper binding                                                                                                                                                                            | `Binding<number>`     | yes      | `undefined`   |
| `step`          | The increment/decrement amount                                                                                                                                                                 | `number`              | no       | `1`           |
| `range`         | The range of values `[minNumber, maxNumber]`                                                                                                                                                   | `[number, number]`    | no       | `[0, 10]`     |
| `updateOnSlide` | If true, the value will update as the slider is moving. If false, it will only update when the gesture has been completed. Setting this to true might cause some lag if the range is too wide. | `boolean`             | no       | `true`        |
| `tint`          | The fill-color                                                                                                                                                                                 | `UIColor`             | no       | `systemBlue`  |
| `trackTint`     | The track color                                                                                                                                                                                | `UIColor`             | no       | `systemGray4` |
| `thumbTint`     | The thumb color                                                                                                                                                                                | `UIColor`             | no       | `#fff`        |
| `onChange`      | Function to execute when the slider value changes                                                                                                                                              | `(v: number) => void` | no       | `undefined`   |
