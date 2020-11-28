# Button

A clickable element that performs an action

## swiftui-react-native

```jsx
import { Button } from 'swiftui-react-native';
```

```jsx
<Button action={doSomething}>
  <Text>Click me</Text>
</Button>
```

or

```jsx
<Button text='Click me' action={doSomething} />
```

## SwiftUI

```swift
  Button(action: doSomething) {
    Text("Click me")
  }
```

or

```swift
  Button("Click me", action: doSomething)
```
