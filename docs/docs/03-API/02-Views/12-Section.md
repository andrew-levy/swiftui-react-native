---
---

A container view that you can use to add hierarchy to a List view.

:::info
Secitons should only be used as children of a List view.
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<List>
  <Section header="My Static List">
    <Text>List Item</Text>
    <Text>List Item</Text>
    <Text>List Item</Text>
  </Section>
</List>
```

</TabItem>

<TabItem value="swiftui" label="SwiftUI">

```swift
List {
  Section(header: Text("My Static List")) {
    Text("List Item")
    Text("List Item")
    Text("List Item")
  }
}
```

</TabItem>
</Tabs>

## Props

List inherits all [View Modifiers](../modifiers#view-modifiers) as props.

| prop              | description          | type                                                | required | default          |
| ----------------- | -------------------- | --------------------------------------------------- | -------- | ---------------- |
| `header`          | List header          | `string ` or ` ReactElement<any>`                   | no       | `undefined`      |
| `footer`          | List footer          | `string ` or ` ReactElement<any>`                   | no       | `undefined`      |
| `listStyle`       | List style           | `"insetGrouped"` or `"grouped"`                     | no       | `"insetGrouped"` |
| `separatorTint`   | Separator tint color | `UIColor`                                           | no       | `undefined`      |
| `separatorHidden` | Separator hidden     | `boolean`                                           | no       | `false`          |
| `children`        | Section content      | `ReactNode` or `(data: T, i: number ) => ReactNode` | no       | `null`           |
