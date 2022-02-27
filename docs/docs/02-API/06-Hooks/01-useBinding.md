---
---

The `useBinding` hook creates a binding value that can be passed into views that play a role in updating that value.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const $text = useBinding('');
```

```tsx
<TextField text={$text} />
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
