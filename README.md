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

### Controls :control_knobs: :bulb:

- **Toggle:** An toggle element to switch a value on/off
- **Picker:** A styled selection element
- **Slider:** A slideable value selector
- **Stepper:** An element to increment and decrement a value

### Text :pencil: :abc:

- **Text:** A text element
- **TextField:** A text input element
- **Label:** An element with text and an icon/image

### Scroll Views + Sheets :scroll: :arrow_up:

- **ScrollView:** A scrollable view
- **BottomSheet:** An animated bottom sheet

### UI Elements :atom_symbol: :iphone:

- **Button:** A clickable element that performs an action
- **Image:** An image or icon
- **Link:** An external link redirecting to the browser
- **Spacer:** Space in between views (horizontal or vertical)
- **List:** A formatted list
- **RoundedRectangle:** You guessed it, a rounded rectangle
<!-- ### Views/Lists :pencil: :scroll: -->

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

### React Native CLI

**Step 1:** Install the package in your React Native project:

```console
yarn add swiftui-react-native
```

**Step 2:** Add the following dependencies:

```console
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

**Step 3:** The dependency `react-native-gesture-handler` requires you to complete one more step (see <a href='https://docs.swmansion.com/react-native-gesture-handler/docs/'>documentation</a> for more info):

**iOS**

Import the package at the top of your `index.js` file:

```javascript
import 'react-native-gesture-handler';
```

Then run:

```console
cd ios && pod install && cd ..
```

**Step 4:**

Finally, run

```console
react-native run-ios
```

You should be all set now!

### Navigation

If you intend on using any of the navigation views, you will need to install these dependencies as well:

```console
yarn add @react-navigation/bottom-tabs @react-navigation/native @react-navigation/stack
```

Then run:

```console
cd ios && pod install && cd ..
```

Finally, run

```console
react-native run-ios
```

**Note:** These views are based off of React Navigation components https://reactnavigation.org/docs/getting-started/.

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

## TODO

- [ ] Make package stable and easy to install via npm
- [ ] Add SFSymbols support (react-native-sfsymbols)
- [ ] Make Spacer view work like SwiftUI (fill remaining space)
- [ ] Add haptic feedback to views like Picker and others
