---
title: Experimental API
---

## What is it?

You can do a lot with the components and modifier props provided by this library, but SwiftUI has a few superpowers that cannot be easily implemented in JSX. This is where the experimental API comes in. It allows you to tap into the full power of SwiftUI modifiers. Shout out to [swiftui-react](https://github.com/tarngerine/swiftui-react/tree/main) and [Mark Lawlor] (https://x.com/mark__lawlor/status/1755721514643832854?s=20) for the inspiration for this api.

## Why might you need this?

### Duplicate Modifiers

In SwiftUI, applying the same modifiers multiple times is allowed since modifiers build on top of each other. This is known as the builder pattern. For example, the following is valid:

```swift
Text("Hello, world!")
    .padding()
    .border(Color.blue)
    .padding()
    .border(Color.red)
```

This would result in a text view with padding around the text, followed by a blue border, followed by more padding, and finally a red border, working from the inside out.

In order to achieve the same effect, we need a special API that allows us to iteratively build up a view with modifiers, while still rendering a JSX element.

### Familiarity

If you are coming from a SwiftUI background, you may find the experimental API more familiar and comfortable to use.

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
