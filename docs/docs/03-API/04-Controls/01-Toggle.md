---
---

A component to switch between on and off values

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const $isOn = useBinding(false);
```

```tsx
<Toggle isOn={isOn} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
@State var isOn = ""
```

```swift
Toggle(isOn: $isOn)
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
const [isOn, setIsOn] = useState(false);
```

```tsx
<Switch value={isOn} onChange={(v) => setIsOn(!v)}>
```

</TabItem>
</Tabs>
