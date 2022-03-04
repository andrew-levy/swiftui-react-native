---
---

The `useBinding` hook creates a two-way-bindable value that can be passed into views that play a role in updating that value.

```typescript
function useBinding<T>(
  initialValue: T
): T extends boolean ? BooleanBinding : Binding<T>;
```

Under the hood, this hook uses `useState` and returns an object containing the value and a function to update it. Inside each view that accepts a binding (controls and `TextField`), there is logic to read the current value and update it when an action is taken. This way, you can pass in a single value as a prop and know that it will be updated at the right time.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const $text = useBinding('');
```

```tsx
<TextField text={$text} />
<Text>Current Value: {$text.value}</Text>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
@State var text = ""
```

```swift
TextField("Name", text: $text)
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
const [text, setText] = useState('');
```

```tsx
<TextInput value={text} onChangeText={(newText) => setText(newText)} />
```

</TabItem>
</Tabs>

:::tip
The `$` is optional, but it makes it clear that this value is a binding
:::
