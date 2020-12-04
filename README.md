# swiftui-react-native

:exclamation::exclamation: This project is new and is currently being worked on. Most views aren't complete but will be in time! :exclamation::exclamation:

<img src="https://github.com/andrew-levy/swiftui-react-native/blob/master/assets/readme.png?raw=true" />

## What is it?

SwiftUI is awesome. So is React Native! This library aims to leverage some of the best SwiftUI features in React Native applications.

## Views

### Stacks :pancakes: :abcd:

- **VStack:** Vertical stack
- **HStack:** Horizontal stack
- **ZStack:** Overlay stack

### UI Elements :atom_symbol: :iphone:

- **Button:** A clickable element that performs an action
- **Image:** An image or icon
- **Link:** An external link redirecting to the browser
- **Spacer:** Space in between views (horizontal or vertical)
- **Text:** A text element
- **TextField:** A text input element
- **Label:** An element with text and an icon/image
- **Toggle:** An toggle element to switch something on/off
- **Picker:** A horizontal picker element

### Views/Lists :pencil: :scroll:

- **ScrollView:** A scrollable view
- **List:** A formatted list

### Navigation :arrow_right: :link:

- **NavigationManager:** Navigation wrapper
- **NavigationViewManager:** A collection of naviagble views
- **NavigationView:** A representation of a navigable screen
- **NavigationLink:** A link to another view
- **TabView:** A tab bar view
- **TabItem:** A tab bar item

## Contribution

Run `npm run build` to generate a `dist/` folder, then run `npm run watch` while developing.

## Usage

Install the package like this:

`yarn add swiftui-react-native`

Import the components you need like this:

```javascript
import { VStack, Text, Button } from 'swiftui-react-native';
```

And display them like this:

```jsx
return (
  <VStack
    aligment='leading'
    background='systemGray6'
    padding={['leading', 30]}
    cornerRadius={20}
  >
    <Text font='title'>Some cool text</Text>
    <Button action={doSomething}>
      <Text>Click the cool button</Text>
    </Button>
  </VStack>
);
```

vs. SwiftUI...

```swift
var body: some View {
  VStack(alignment: .leading) {
    Text("Some cool text").font(.title)
    Button(action: doSomething) {
      Text("Click the cool button")
    }
  }.background(Color(UIColor.systemGray6))
   .cornerRadius(20)
   .padding(30)
}
```

## Features

- Components/Views
- Custom Hooks
- Native iOS themes and colors
- Pre-styled components (`examples/`)
