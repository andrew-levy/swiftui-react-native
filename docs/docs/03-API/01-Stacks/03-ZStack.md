---
---

A view that overlays its children, aligning them in both axes

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<ZStack frame={{ width: 100, height: 100 }}>
  <Image systemName="circle.fill" fontSize={100} />
  <Image systemName="circle.fill" foregroundColor="systemTeal" fontSize={50} />
  <Text foregroundColor="white" bold>
    ZStack
  </Text>
</ZStack>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
ZStack(alignment: .topLeading) {
    Image(systemName: "circle.fill").font(.system(size: 100))
    Image(systemName: "circle.fill").foregroundColor(.systemTeal).font(.system(size: 50))
    Text("ZStack").foregroundColor(.white).bold()
}.frame(width: 100, height: 100)
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
<View style={{ width: 100, height: 100 }}>
  <Image
    source={require('circle.fill.jpg')}
    style={{ fontSize: 100, position: 'absolute', zIndex: 1 }}
  />
  <Image
    source={require('circle.fill.jpg')}
    style={{ fontSize: 50, color: 'teal', position: 'absolute', zIndex: 2 }}
  />
  <Text
    style={{
      color: 'white',
      fontWeight: 'bold',
      position: 'absolute',
      zIndex: 3,
    }}
  >
    ZStack
  </Text>
</View>
```

</TabItem>
</Tabs>

## Props

ZStack inherits all [View Modifiers](../08-modifiers.md#full-list) as props.

:::info
The `frame` prop is required for ZStack.
:::

| prop        | description                         | type                                                                                                                                                                              | required | default    |
| ----------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------- |
| `spacing`   | Amount of space between stack items | `number`                                                                                                                                                                          | no       | `0`        |
| `alignment` | The alignment guide                 | `'leading'` &#124; `'trailing'`&#124; `'top'` &#124; `'bottom'` &#124; `'topLeading'` &#124; `'topTrailing'` &#124; `'bottomLeading'` &#124; `'bottomTrailing'` &#124; `'center'` | no       | `'center'` |
| `frame`     | The view's frame                    | `Frame`                                                                                                                                                                           | yes      | `null`     |
| `children`  | Stack items                         | `React.ReactElement<any>` &#124; `React.ReactElement<any>[]`                                                                                                                      | no       | `null`     |
