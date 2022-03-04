---
---

A function that allows you map over an array to dynamically render a collection of views

```typescript
function ForEach<T>(
  iterable: T[],
  renderFn: (element: T, index: number) => ReactElement<any>
): ReactElement<any, string | React.JSXElementConstructor<any>>[];
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
const options = ['Option 1', 'Option 2', 'Option 3'];
```

```tsx
<VStack>
  {ForEach(options, (option, i) => (
    <Text key={i}>{option}</Text>
  ))}
</VStack>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
let options = ["Option 1", "Option 2", "Option 3"]
```

```swift
VStack {
    ForEach(options, id: \.self) { option in
        Text(option)
    }
}
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
const options = ['Option 1', 'Option 2', 'Option 3'];
```

```tsx
<View>
  {options.map((option, i) => (
    <Text key={i}>{option}</Text>
  ))}
</View>
```

</TabItem>
</Tabs>
