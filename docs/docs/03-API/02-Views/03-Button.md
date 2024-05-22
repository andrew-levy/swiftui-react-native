---
---

A control that initiates an action.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<Button
  title="Click the cool button"
  action={doSomething}
  buttonStyle="borderedProminent"
  bold
/>
```

```tsx
<Button action={doSomething} buttonStyle="borderedProminent">
  <Label title="Hello world!" systemImage="person.fill" />
</Button>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
Button("Click the cool button", action: doSomething)
  .bold()
  .buttonStyle(.borderedProminent)
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<Button
  onPress={doSomething}
  title="Click the cool button"
  style={styles.buttonStyle}
/>
```

</TabItem>
</Tabs>

## Props

Button inherits all [View Modifiers](../08-modifiers.md#full-list) as props.

| prop       | description                                          | type         | required | default     |
| ---------- | ---------------------------------------------------- | ------------ | -------- | ----------- |
| `title`    | The text of the button.                              | `string`     | yes      | `undefined` |
| `action`   | The action to perform when the user taps the button. | `() => void` | yes      | `undefined` |
| `children` | The content of the button.                           | `ReactNode`  | no       | `undefined` |
