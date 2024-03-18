---
---

A control that initiates an action.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

### Verbose

```tsx
<Button action={doSomething} buttonStyle="borderedProminent">
  <Text bold fontSize={24}>
    Click the cool button
  </Text>
</Button>
```

### Shorthand

```tsx
<Button
  title="Click the cool button"
  action={doSomething}
  buttonStyle="borderedProminent"
  bold
/>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

### Verbose

```swift
Button(action: doSomething) {
    Text("Click the cool button")
        .fontWeight(.bold)
}.buttonStyle(.borderedProminent)
```

### Shorthand

```swift
Button("Click the cool button", action: doSomething)
  .fontWeight(.bold)
  .buttonStyle(.borderedProminent)
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<TouchableOpacity onPress={doSomething}>
  <Text style={{ fontWeight: 'bold' }}>Click the cool button</Text>
</TouchableOpacity>
```

</TabItem>
</Tabs>

## Props

Button inherits all [View Modifiers](../08-modifiers.md#full-list) as props.

| prop       | description                                          | type         | required | default     |
| ---------- | ---------------------------------------------------- | ------------ | -------- | ----------- |
| `title`    | The text of the button.                              | `string`     | yes      | `undefined` |
| `action`   | The action to perform when the user taps the button. | `() => void` | yes      | `undefined` |
| `children` | The button content.                                  | `ReactNode`  | no       | `undefined` |
