---
---

A container that presents rows of data arranged in a single column.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

### Static

```tsx
<List>
  <Text>List Item</Text>
  <Text>List Item</Text>
  <Text>List Item</Text>
</List>
```

### Dynamic

```tsx
const options = ['Option 1', 'Option 2', 'Option 3'];
```

```tsx
<List data={options}>{(option) => <Text>{option}</Text>}</List>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

### Static

```swift
List {
    Text("List Item")
    Text("List Item")
    Text("List Item")
}
```

### Dynamic

```swift
var options: [String] = ["Option 1", "Option 2", "Option 3"]
```

```swift
List(options) { option in
    Text("\(option)")
}
```

</TabItem>
</Tabs>

## Props

List inherits all [View Modifiers](../modifiers#view-modifiers) as props.

| prop              | description          | type                                                | required | default          |
| ----------------- | -------------------- | --------------------------------------------------- | -------- | ---------------- |
| `listStyle`       | List style           | `"insetGrouped"` or `"grouped"`                     | no       | `"insetGrouped"` |
| `data`            | List data            | `T`                                                 | no       | `null`           |
| `separatorTint`   | Separator tint color | `UIColor`                                           | no       | `undefined`      |
| `separatorHidden` | Separator hidden     | `boolean`                                           | no       | `false`          |
| `children`        | List content         | `ReactNode` or `(data: T, i: number ) => ReactNode` | no       | `null`           |
