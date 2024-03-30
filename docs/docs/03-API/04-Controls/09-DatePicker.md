---
---

A control for selecting an absolute date.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const today = useMemo(() => new Date(), []);
const date = useBinding(today);
```

```tsx
<DatePicker
  title="Select a date"
  selection={date}
  displayModes={['date', 'hourAndMinute']}
/>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
@State var date = Date()
```

```swift
DatePicker("Select a date", selection: $date, displayedComponents: [.date, .hourAndMinute])
```

</TabItem>
</Tabs>

## Props

ColorPicker inherits all [View Modifiers](../modifiers#full-list) as props.

| prop        | description                                       | type                | required | default     |
| ----------- | ------------------------------------------------- | ------------------- | -------- | ----------- |
| `selection` | The date value                                    | `Date`              | yes      | `undefined` |
| `onChange`  | Function to execute when a date selection is made | `(v: Date) => void` | no       | `undefined` |
