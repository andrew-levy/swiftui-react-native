---
---

A control that displays an editable text interface.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<TextField placeholder="Name" text={text} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
TextField("Name", text: $text)
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<TextInput
  placeholder="Name"
  value={text}
  onChangeText={(text) => setText(text)}
/>
```

</TabItem>
</Tabs>

## Props

TextField inherits all [View Modifiers](../modifiers#view-modifiers) as props.

| prop          | description                                           | type            | required | default     |
| ------------- | ----------------------------------------------------- | --------------- | -------- | ----------- |
| `placeholder` | The title of the text view, describing its purpose.   | `string`        | no       | `''`        |
| `text`        | The text to display and edit.                         | `StringBinding` | yes      | `undefined` |
| `onChange`    | Function to execute when the input text value changes | `() => void`    | no       | `undefined` |