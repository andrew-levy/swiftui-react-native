---
title: Experimental
---

You can do a lot with the components provided by this library, but SwiftUI has a few superpowers that cannot be easily implemented in JSX. This is where the experimental API comes in. It allows you to use the full power of SwiftUI modifiers. Shout out to [swiftui-react](https://github.com/tarngerine/swiftui-react/tree/main) for the input.

## Usage

```tsx
import {
  VStack,
  Text,
  ColorPicker,
  useBinding,
} from 'swiftui-react-native/experimental';

function CustomSwiftUIView() {
  const color = useBinding('red');
  return VStack(
    { alignment: 'leading', spacing: 10 },
    Text('Select a Color').padding(),
    ColorPicker({ selection: color })
  )
    .padding()
    .border({ color: 'gray', width: 1 })
    .padding()
    .border({ color: 'red', width: 2 });
}
```

As you can see, this looks just like SwiftUI's syntax, but in JavaScript! This API allows us to apply the same modifier multiple times, which can be useful for creating complex views.
