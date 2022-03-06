---
---

A control that displays an editable text interface.


## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<TextField text={text} placeholder="Name" />
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