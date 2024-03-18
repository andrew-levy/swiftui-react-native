---
---

A control that displays an editable text interface.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const password = useBinding('');
```

```tsx
<SecureField placeholder="Password" text={password} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
@State var password: String = ""
```

```swift
SecureField("Password", text: $name)
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
const [password, setPassword] = useState('');
```

```tsx
<TextInput
  placeholder="Password"
  secureTextEntry={true}
  textContentType="password"
  value={name}
  onChangeText={(newName) => setName(newName)}
/>
```

</TabItem>
</Tabs>

## Props

SecureField inherits all [TextField props](./04-TextField.md#props).
