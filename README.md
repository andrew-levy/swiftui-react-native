# swiftui-react-native

:exclamation::exclamation: This project is new and has not reached a stable release yet. Working to complete all features soon! :exclamation::exclamation:

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
- **Toggle:** An toggle element to switch a value on/off
- **Picker:** A styled selection element
- **Slider:** A slideable value selector
- **Stepper:** An element to increment and decrement a value
- **RoundedRectangle:** You guessed it, a rounded rectangle

### Views/Lists :pencil: :scroll:

- **ScrollView:** A scrollable view
- **List:** A formatted list
- **BottomSheet:** An animated bottom sheet

### Navigation :arrow_right: :link:

- **NavigationManager:** Navigation wrapper
- **NavigationViewManager:** A collection of naviagble views
- **NavigationView:** A representation of a navigable screen
- **NavigationLink:** A link to another view
- **TabView:** A tab bar view
- **TabItem:** A tab bar item

## Contribution

Run `yarn build` to generate a `dist/` folder, then run `yarn watch` while developing.

## Installation

Install the package in your React Native project:

`yarn add swiftui-react-native`

### Navigation Dependencies

If you intend on using any of the navigation components, you will need to install these as well:

`yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

Then run,

`cd ios && pod install`

Note: These views are based off of React Navigation components https://reactnavigation.org/docs/getting-started/.
Another Note: If you run into any error messages regarding RNGesutureHandler, try restarting the bundler and re-running `yarn ios`. Trying to fix this ASAP!

## Usage

Import the components you need like this:

```javascript
import { VStack, Text, Button } from 'swiftui-react-native';
```

And display them like this:

```jsx
return (
  <VStack
    aligment='leading'
    background={UIColor.systemGray6}
    padding={{ leading: 30 }}
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
   .padding(.leading, 30)
}
```

## Features

- iOS Views
- Custom Hooks
- Native iOS themes and colors
- Pre-styled components (`examples/`)
