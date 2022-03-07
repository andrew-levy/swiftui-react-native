---
---

A view that overlays its children, aligning them in both axes

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<HStack alignment="top" spacing={10}>
  <Text>Hello</Text>
  <Text>World</Text>
</HStack>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
HStack(alignment: .top, spacing: 10) {
    Text("Hello")
    Text("World")
}
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<View style={{ flexDirection: 'row', jusitfyContent: 'flex-start' }}>
  <Text>Hello</Text>
  <Text style={{ marginLeft: 10 }}>World</Text>
</View>
```

</TabItem>
</Tabs>

## Props

ZStack inherits all `Modifiers` as props.

:::info
The `frame` prop is required for ZStack.
:::

| prop       | description                         | type                                                                                                                                                                              | required | default    |
| ---------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------- |
| spacing    | Amount of space between stack items | `number`                                                                                                                                                                          | no       | `0`        |
| alignment  | The alignment guide                 | `'leading'` &#124; `'trailing'`&#124; `'top'` &#124; `'bottom'` &#124; `'topLeading'` &#124; `'topTrailing'` &#124; `'bottomLeading'` &#124; `'bottomTrailing'` &#124; `'center'` | no       | `'center'` |
| frame      | The view's frame                    | `Frame`                                                                                                                                                                           | yes      | `null`     |
| `children` | Stack items                         | `React.ReactElement<any>` &#124; `React.ReactElement<any>[]`                                                                                                                      | no       | `null`     |
