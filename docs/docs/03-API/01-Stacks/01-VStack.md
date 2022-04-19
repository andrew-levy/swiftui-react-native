---
---

A view that arranges its children vertically.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<VStack alignment="leading" spacing={10}>
  <Text>Hello</Text>
  <Text>World</Text>
</VStack>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
VStack(alignment: .leading, spacing: 10) {
    Text("Hello")
    Text("World")
}
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<View>
  <Text>Hello</Text>
  <Text style={{ marginTop: 10 }}>World</Text>
</View>
```

</TabItem>
</Tabs>

## Props

VStack inherits all [View Modifiers](../modifiers#view-modifiers) as props.

| prop        | description                         | type                                                         | required | default    |
| ----------- | ----------------------------------- | ------------------------------------------------------------ | -------- | ---------- |
| `spacing`   | Amount of space between stack items | `number`                                                     | no       | `0`        |
| `alignment` | The alignment guide                 | `'leading'` &#124; `'trailing'` &#124; `'center'`            | no       | `'center'` |
| `children`  | Stack items                         | `React.ReactElement<any>` &#124; `React.ReactElement<any>[]` | no       | `null`     |
