---
---

The `useBinding` hook creates a two-way-binding value that can be passed into views that play a role in updating that value.

```typescript
function useBinding<T>(initialValue: T): Binding<T>;
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const text = useBinding('');
```

```tsx
<TextField text={text} />
<Text>Current Value: {text.value}</Text>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
@State var text = ""
```

```swift
TextField("Name", text: $text)
Text("Current Value: \(text)")
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
const [text, setText] = useState('');
```

```tsx
<TextInput value={text} onChangeText={(newText) => setText(newText)} />\
<Text>Current Value: {text}</Text>
```

</TabItem>
</Tabs>

## Manually setting the value

Sometimes you might want to set the value of a binding manually. You can do this by using the `setValue` method on the binding, or, if your binding is a boolean, you can use the `toggle` method.

```tsx
text.setValue('Hi');
showAlert.toggle();
```
