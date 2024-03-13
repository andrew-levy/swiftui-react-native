---
title: Modifiers
---

In SwiftUI, view modifiers allow you to easily change a view's appearance or behavior.

```swift
Text("Hello, world!")
    .font(.title)
    .foregroundColor(.green)
    .padding()
```

To approximate this in React Native, views are styled using props. Each prop corresponds to a modifier in SwiftUI.

### Order Matters

It's important to note that the order of modifiers matters. This is true for SwiftUI and for this library. For example,

```tsx
<VStack border={{ color: 'blue' }} padding />
```

produces a different result than

```tsx
<VStack padding border={{ color: 'blue' }} />
```

### Duplicate Modifiers

In SwiftUI, duplicate modifiers are allowed since modifiers build on top of each other. To achieve the same effect, we need a special API that allows us to iteratively build up a view with modifiers, while still rendering a JSX element. For this, see the [experimental API](/docs/03-API/09-experimental).
