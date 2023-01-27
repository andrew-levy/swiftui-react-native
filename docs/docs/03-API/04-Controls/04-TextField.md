---
---

A control that displays an editable text interface.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const $firstName = useBinding('');
```

```tsx
<TextField placeholder="Name" text={$firstName} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
@State var name: String = ""
```

```swift
TextField("Name", text: $name)
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
const [name, setName] = useState('');
```

```tsx
<TextInput
  placeholder="Name"
  value={name}
  onChangeText={(newName) => setName(newName)}
/>
```

</TabItem>
</Tabs>

## Props

TextField inherits all [View Modifiers](../modifiers#view-modifiers) and [Text Modifiers](../modifiers#text-modifiers) as props.

| prop                     | description                                                                            | type              | required | default     |
| ------------------------ | -------------------------------------------------------------------------------------- | ----------------- | -------- | ----------- |
| `text`                   | The text to display and edit.                                                          | `Binding<string>` | yes      | `undefined` |
| `placeholder`            | The title of the text view, describing its purpose.                                    | `string`          | no       | `""`        |
| `onChange`               | Function to execute when the input text value changes                                  | `() => void`      | no       | `undefined` |
| `autocorrectionDisabled` | Whether to disable autocorrect.                                                        | `boolean`         | no       | `false`     |
| `autocapitalization`     | Whether to enable auto capitalization.                                                 | `boolean`         | no       | `false`     |
| `keyboardType`           | The type of keyboard to use.                                                           | `KeyboardType`    | no       | `default`   |
| `textContentType`        | The type of text content to use.                                                       | `TextContentType` | no       | `none`      |
| `secureField`            | Whether to hide the text being entered. You can also use the `SecureField` component.  | `boolean`         | no       | `false`     |
| `textEditor`             | Whether to use a text editor (multiline). You can also use the `TextEditor` component. | `boolean`         | no       | `false`     |
