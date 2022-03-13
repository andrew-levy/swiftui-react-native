---
---

A view that displays an image.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<Image systemName="bolt.fill">
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Image(systemName: "bolt.fill")
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<Image source={'/bolt-fill.png'}>
```

</TabItem>
</Tabs>

## Props

Image inherits all [View Modifiers](../modifiers#view-modifiers) as props.

| prop         | description                             | type                                             | required | default     |
| ------------ | --------------------------------------- | ------------------------------------------------ | -------- | ----------- |
| `systemName` | Creates a system symbol image.          | `string`                                         | no       | `undefined` |
| `source`     | The image resource to lookup            | `number`, `ImageURISource` or `ImageURISource[]` | no       | `undefined` |
| `style`      | The image styling to apply in the View. | `ReactNative.ImageStyle`                         | no       | `undefined` |
