# List

## swiftui-react-native

```jsx
<List listStyle='grouped'>
  <Text>Andrew</Text>
  <Text>Kendra</Text>
  <Text>Peter</Text>
  <Text>Tyler</Text>
  <Text>Teddy</Text>
</List>
```

or

```jsx
<List listStyle='grouped'>
  {names.map((name) => (
    <Text>{name}</Text>
  ))}
</List>
```

## SwiftUI

```swift
  List {
    Text("Andrew")
    Text("Kendra")
    Text("Peter")
    Text("Tyler")
    Text("Teddy")
  }.listStyle(.grouped)
```

or

```swift
  List(names) { name in
    Text(name)
  }.listStyle(.grouped)
```
