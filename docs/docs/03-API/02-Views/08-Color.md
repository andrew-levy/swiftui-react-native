---
---

A representation of a color that adapts to a given context.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<Color.red frame={{ width: 100, height: 100 }} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Color.red
    .frame(width: 100, height: 100)
```

</TabItem>
</Tabs>

Supported Colors:

- `Color.black`
- `Color.blue`
- `Color.brown`
- `Color.clear`
- `Color.cyan`
- `Color.gray`
- `Color.green`
- `Color.indigo`
- `Color.mint`
- `Color.orange`
- `Color.pink`
- `Color.purple`
- `Color.red`
- `Color.teal`
- `Color.yellow`
- `Color.accentColor`
- `Color.primary`
- `Color.secondary`
- `Color.white`

## Props

Color inherits all [View Modifiers](../modifiers#full-list) as props.

| prop    | description     | type    | required | default     |
| ------- | --------------- | ------- | -------- | ----------- |
| `color` | The color value | `Color` | no       | `undefined` |
