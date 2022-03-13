---
---

A representation of a color that adapts to a given context.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

### Custom

```tsx
<Color
  color={{ red: 255, blue: 100, green: 50 }}
  cornerRadius={10}
  frame={{ width: 100, height: 100 }}
/>
```

### UIColor

```tsx
<Color
  color="systemIndigo"
  cornerRadius={10}
  frame={{ width: 100, height: 100 }}
/>
```

### Shorthand

```tsx
<Color.red cornerRadius={10} frame={{ width: 100, height: 100 }} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

### Custom

```swift
Color(red: 1.0, green: 0.5, blue: 1.0)
    .cornerRadius(10)
    .frame(width: 100, height: 100)
```

### UIColor

```swift
Color(UIColor(.systemIndigo))
    .cornerRadius(10)
    .frame(width: 100, height: 100)
```

### Shorthand

```swift
Color.red
    .cornerRadius(10)
    .frame(width: 100, height: 100)
```

</TabItem>
</Tabs>

## Props

Color inherits all [View Modifiers](../modifiers#view-modifiers) and [Shape Modifiers](../modifiers#text-modifiers) as props.

| prop    | description     | type                                                           | required | default     |
| ------- | --------------- | -------------------------------------------------------------- | -------- | ----------- |
| `color` | The color value | `UIColor` or `{ red?: number; blue?: number; green?: number;}` | no       | `undefined` |

:::info
The `frame` prop is required for Color.
:::
