---
---

A view that arranges its children horizontally.

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
<View style={{ flexDirection: 'row', jusitfyContent: 'flex-start', gap: 10 }}>
  <Text>Hello</Text>
  <Text>World</Text>
</View>
```

</TabItem>
</Tabs>

## Props

HStack inherits all [View Modifiers](../08-modifiers.md#full-list) as props.

| prop        | description                         | type                                        | required | default    |
| ----------- | ----------------------------------- | ------------------------------------------- | -------- | ---------- |
| `spacing`   | Amount of space between stack items | `number`                                    | no       | `0`        |
| `alignment` | The alignment guide                 | `'top'` &#124; `'bottom'` &#124; `'center'` | no       | `'center'` |
| `children`  | Stack items                         | `ReactNode`                                 | no       | `null`     |
