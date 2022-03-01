---
---

The `useBinding` hook creates a binding value that can be passed into views that play a role in updating that value.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

Create a binding value

```tsx
const $text = useBinding('');
```

Then pass the binding to the view

```tsx
<TextField text={$text} />
```

:::info
The `$` is optional, but it makes it clear that this value is a binding
:::

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

Create a state variable

```swift
@State var text = ""
```

Then pass the binding to the view

```swift
TextField("Name", text: $text)
```

</TabItem>
<TabItem value="react-native" label="React Native">

Create local state via `useState`

```tsx
const [text, setText] = useState('');
```

Then pass the getter and setter to the view using the appropriate props

```tsx
<TextInput value={text} onChangeText={(newText) => setText(newText)} />
```

</TabItem>
</Tabs>
