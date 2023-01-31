---
---

A view that can display and edit long-form text.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const $bio = useBinding('');
```

```tsx
<TextEditor placeholder="Bio" text={$bio} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
@State var bio: String = ""
```

```swift
TextEditor("Bio", text: $bio)
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
const [bio, setBio] = useState('');
```

```tsx
<TextInput
  placeholder="Bio"
  multiline={true}
  value={name}
  onChangeText={(newBio) => setBio(newBio)}
/>
```

</TabItem>
</Tabs>

## Props

TextEditor inherits all [TextField props](./04-TextField.md#props).
