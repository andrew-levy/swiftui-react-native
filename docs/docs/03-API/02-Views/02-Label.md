---
---

A standard label for user interface items, consisting of an icon with a title.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<Label title="Super Fast" systemImage="bolt.fill" />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Label("Super Fast", systemImage: "bolt.fill")
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<View style={{ flexDirection: 'row' }}>
    <Image source={require('./assets/bolt-fill.png')}>
    <Text>Super Fast<Text>
</View>
```

</TabItem>
</Tabs>

## Props

Label inherits all [View Modifiers](../08-modifiers.md#full-list) as props.

| prop          | description                                          | type                      | required | default     |
| ------------- | ---------------------------------------------------- | ------------------------- | -------- | ----------- |
| `title`       | A title for the label.                               | `string`                  | no       | `undefined` |
| `icon`        | A React element to render as an icon.                | `React.ReactElement<any>` | yes      | `undefined` |
| `systemImage` | The SF Symbol name to render as the icon.            | `SystemName`              | no       | `undefined` |
| `spacing`     | The spacing to apply between the title and the icon. | `number`                  | no       | `5`         |
