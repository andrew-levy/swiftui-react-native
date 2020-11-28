# List

A formatted list

## swiftui-react-native

Static

```jsx
<List listStyle='grouped'>
  <Text>Andrew</Text>
  <Text>Kendra</Text>
  <Text>Peter</Text>
  <Text>Tyler</Text>
  <Text>Teddy</Text>
</List>
```

Dynamic

```jsx
<List listStyle='grouped'>
  {names.map((name) => (
    <Text>{name}</Text>
  ))}
</List>
```

## SwiftUI

Static

```swift
  List {
    Text("Andrew")
    Text("Kendra")
    Text("Peter")
    Text("Tyler")
    Text("Teddy")
  }.listStyle(.grouped)
```

Dynamic

```swift
  List(names) { name in
    Text(name)
  }.listStyle(.grouped)
```
