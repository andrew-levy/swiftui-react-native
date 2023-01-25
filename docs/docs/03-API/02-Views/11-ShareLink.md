---
---

A view that controls a sharing presentation.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<ShareLink title="Share" item="https://mywebsite.com">
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Link("Share", item URL(string: "https://mywebsite.com"))
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<Button title="Share" onPress={() => await Sharing.share({url: "https://www.apple.com"})}>
```

</TabItem>
</Tabs>

:::info
In addition to sharing links, you can also share text and images. If you want to share an image, use the following format for the `item` prop:

```tsx
let fileExt = "png";
let base64Encoding = "..."; // You can use an online tool to convert an image to a base64 string

<ShareLink title="Share" item={`data:image/${fileExt};base64,${base64Encoding}`}>
```

:::

## Props

Link inherits all [View Modifiers](../modifiers#view-modifiers) and [Text Modifiers](../modifiers#text-modifiers) as props.
