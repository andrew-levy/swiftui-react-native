---
---

A control for presenting a menu of actions.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info
You can use `Text`, `Divider`, `Button`, `Section`, `Toggle` and `Menu` as children of `Menu`.
:::

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<Menu title="Click Me!">
  <Text>Some text</Text>
  <Divider />
  <Button
    title="Delete"
    role="destructive"
    action={deleteItem}
    systemImage="trash"
  />
  <Section header="Section">
    <Text>Item 1</Text>
    <Text>Item 2</Text>
    <Text>Item 3</Text>
  </Section>
  <Menu title="Sub menu">
    <Text>Sub menu item</Text>
  </Menu>
</Menu>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Menu("Click Me!") {
    Text("Some text")
    Divider()
    Button("Delete", systemImage: "trash", role: .destructive, action: deleteItem)
    Section(header: "Section") {
        Text("Item 1")
        Text("Item 2")
        Text("Item 3")
    }
    Menu("Sub menu") {
        Text("Sub menu item")
    }
}
```

</TabItem>
</Tabs>

## Props

List inherits all [View Modifiers](../modifiers#full-list) as props.

| prop            | description                      | type         | required | default     |
| --------------- | -------------------------------- | ------------ | -------- | ----------- |
| `children`      | Menu content                     | `ReactNode`  | no       | `null`      |
| `title`         | Menu title                       | `string`     | no       | `undefined` |
| `systemImage`   | SF Symbol name                   | `string`     | no       | `undefined` |
| `primaryAction` | Menu primary action when clicked | `() => void` | no       | `undefined` |
