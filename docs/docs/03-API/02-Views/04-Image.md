---
---

A view that displays an image.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

### Normal Image

```tsx
<Image source={require('./assets/bolt.fill.png')}>
```

### System Image

```tsx
<Image systemName="bolt.fill">
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

### Normal Image

```swift
Image(systemName: "bolt.fill")
```

### System Image

```swift
Image("bolt")
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<Image source={require('./assets/bolt.fill.png')}>
```

</TabItem>
</Tabs>

## Props

Image inherits all [View Modifiers](../08-modifiers.md#full-list) as props.

| prop         | description                             | type         | required | default     |
| ------------ | --------------------------------------- | ------------ | -------- | ----------- |
| `systemName` | The SF Symbol name.                     | `string`     | no       | `undefined` |
| `style`      | The image styling to apply in the View. | `ImageStyle` | no       | `undefined` |
