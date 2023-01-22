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

Button inherits all [View Modifiers](../modifiers#view-modifiers) and [Text Modifiers](../modifiers#text-modifiers) as props.

| prop          | description                                          | type          | required | default        |
| ------------- | ---------------------------------------------------- | ------------- | -------- | -------------- |
| `title`       | The text of the button.                              | `string`      | yes      | `undefined`    |
| `action`      | The action to perform when the user taps the button. | `() => void`  | yes      | `undefined`    |
| `disabled`    | Whether the button is able to be clicked.            | `boolean`     | no       | `undefined`    |
| `buttonStyle` | The button style                                     | `ButtonStyle` | no       | `'borderless'` |
| `children`    | The button content.                                  | `ReactNode`   | no       | `undefined`    |

```ts
type ButtonStyle = 'bordered' | 'borderedProminent' | 'plain' | 'borderless';
```
