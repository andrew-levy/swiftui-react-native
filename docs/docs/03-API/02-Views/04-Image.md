---
---

A view that displays an image.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info
Images can only render SF Symbols. For uri or asset based impages, use `Image` from `react-native`.
:::

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<Image systemName="bolt.fill" />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Image(systemName: "bolt.fill")
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<Image source={require('./assets/bolt.fill.png')} />
```

</TabItem>
</Tabs>

## Props

Image inherits all [View Modifiers](../08-modifiers.md#full-list) as props.

| prop         | description        | type     | required | default     |
| ------------ | ------------------ | -------- | -------- | ----------- |
| `systemName` | The SF Symbol name | `string` | no       | `undefined` |
