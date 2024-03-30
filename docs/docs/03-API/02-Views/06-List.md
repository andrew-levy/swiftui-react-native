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
<List>
  {ForEach(options, (option) => (
    <Text key={option}>{option}</Text>
  ))}
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
List {
    ForEach(options, id: \.self) { option in
        Text("\(option)")
    }
}
```

</TabItem>
</Tabs>

## Props

List inherits all [View Modifiers](../modifiers#full-list) as props.

| prop       | description  | type        | required | default |
| ---------- | ------------ | ----------- | -------- | ------- |
| `children` | List content | `ReactNode` | no       | `null`  |
