---
---

A standard label for user interface items, consisting of an icon with a title.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<Label text="Lightning" systemImage="bolt.fill">
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Label("Lightning", systemImage: "bolt.fill")
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx

```

</TabItem>
</Tabs>

## Props

Label inherits all [View Modifiers](../modifiers#view-modifiers) as props.

| prop          | description                                          | type                      | required | default     |
| ------------- | ---------------------------------------------------- | ------------------------- | -------- | ----------- |
| `title`       | A title for the label.                               | `string`                  | no       | `undefined` |
| `icon`        | The name of the image resource to lookup.            | `React.ReactElement<any>` | yes      | `undefined` |
| `systemImage` | The name of the image resource to lookup.            | `SystemName`              | no       | `undefined` |
| `spacing`     | The spacing to apply between the title and the icon. | `number`                  | no       | `undefined` |
