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
<Image source="bolt.fill">
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

Image inherits all [View Modifiers](../modifiers#view-modifiers) and [Text Modifiers](../modifiers#text-modifiers) as props.

| prop         | description                             | type                  | required | default     |
| ------------ | --------------------------------------- | --------------------- | -------- | ----------- |
| `systemName` | The SF Symbol name.                     | `string`              | no       | `undefined` |
| `source`     | The image resource                      | `ImageSourcePropType` | no       | `undefined` |
| `style`      | The image styling to apply in the View. | `ImageStyle`          | no       | `undefined` |
