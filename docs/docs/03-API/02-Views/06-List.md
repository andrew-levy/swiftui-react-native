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
<List inset header="My Static List">
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
<List header="My Dynamic List" data={options}>
  {(option) => <Text>{option}</Text>}
</List>
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

| prop       | description                                                                                          | type                                                | required | default     |
| ---------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------- | -------- | ----------- |
| `header`   | List header                                                                                          | `string ` or ` ReactElement<any>`                   | no       | `undefined` |
| `footer`   | List footer                                                                                          | `string ` or ` ReactElement<any>`                   | no       | `undefined` |
| `inset`    | Gives the list rounded corners and adjusts list width to be inset from the edges of the parent view. | `boolean`                                           | no       | `false`     |
| `data`     | List data                                                                                            | `T`                                                 | no       | `null`      |
| `children` | List Rows                                                                                            | `ReactNode` or `(data: T, i: number ) => ReactNode` | no       | `null`      |
