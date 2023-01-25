---
---

A container view that defines its content as a function of the global coordinate space.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
<GeometryReader>
  {(proxy) => (
    <HStack spacing={0}>
      <Text
        backgroundColor="systemBlue"
        frame={{ width: proxy.size.width * 0.33 }}
      >
        Left
      </Text>
      <Text
        backgroundColor="systemGreen"
        frame={{ width: proxy.size.width * 0.67 }}
      >
        Right
      </Text>
    </HStack>
  )}
</GeometryReader>
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
GeometryReader { proxy in
    HStack(spacing: 0) {
        Text("Left")
            .font(.largeTitle)
            .foregroundColor(.black)
            .frame(width: proxy.size.width * 0.33)
            .background(.yellow)
        Text("Right")
            .font(.largeTitle)
            .foregroundColor(.black)
            .frame(width: proxy.size.width * 0.67)
            .background(.orange)
    }
}
```

</TabItem>
</Tabs>

```tsx
type GeometryProxy = {
  frame: {
    x: number;
    y: number;
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    midX: number;
    midY: number;
  };
  size: {
    width: number;
    height: number;
  };
};
```

## Props

GeometryReader doesn't take any props.
