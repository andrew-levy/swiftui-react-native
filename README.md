# swiftui-react-native

::construction:: ::construction:: This library is under construction so some components might now work as expected. Please feel free to contribute if you think you'd like to use this package.

<img src="https://github.com/andrew-levy/swiftui-react-native/blob/master/assets/readme.png?raw=true" />

## What is it?

SwiftUI is awesome. So is React Native! This library aims to leverage some of the best SwiftUI features in React Native applications.

## Views :eyes:

### Stacks :pancakes: :abcd:

- **VStack:** Vertical stack
- **HStack:** Horizontal stack
- **ZStack:** Overlay stack

### UI Elements :atom_symbol: :iphone:

- **Text:** A text element
- **TextField:** A text input element
- **Label:** An element with text and an icon/image
- **Button:** A clickable element that performs an action
- **Image:** An image or icon
- **Link:** An external link redirecting to the browser
- **Spacer:** Space in between views (horizontal or vertical)
- **List:** A formatted list
- **RoundedRectangle:** You guessed it, a rounded rectangle

### Controls :control_knobs: :bulb:

- **Toggle:** An toggle element to switch a value on/off
- **Picker:** A styled selection element
- **Slider:** A slideable value selector
- **Stepper:** An element to increment and decrement a value

### Scroll Views + Sheets :scroll: :arrow_up:

- **ScrollView:** A scrollable view
- **BottomSheet:** An animated bottom sheet

### Managers + Wrappers :sun_with_face: :new_moon_with_face:

- **ColorSchemeManager:** Dark/Light mode provider
- **NavigationManager:** Container to enable navigation

### Navigation :arrow_right: :link:

- **NavigationManager:** Container to enable navigation
- **NavigationViewManager:** A collection of naviagble views
- **NavigationView:** A representation of a navigable screen
- **NavigationLink:** A link to another view
- **TabView:** A tab bar view
- **TabItem:** A tab bar item

## Hooks :fishing_pole_and_fish:

- **useAlert:** Show a native alert
- **useColorScheme:** Manage light/dark mode
- **useOnAppear:** Perform an action when the view appears
- **useOnDisappear:** Perform an action when the view disappears

## Installation

**Step 1:** Install the package in your React Native project

```console
yarn add swiftui-react-native
```

**Step 2:** Add the following dependencies

```console
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

**Step 3:** The dependency `react-native-gesture-handler` requires you to complete one more <a href='https://docs.swmansion.com/react-native-gesture-handler/docs/'>step</a>. Here is the TL;DR version for iOS:

Import the package at the top of your `index.js` file:

```javascript
import 'react-native-gesture-handler';
```

Then, run

```console
cd ios && pod install && cd ..
```

**Step 4:** Finally, run

```console
npx react-native run-ios
```

You should be all set now!

### Navigation Installation (optional)

If you intend on using any of the navigation views, you will need to install these dependencies as well

```console
yarn add @react-navigation/bottom-tabs @react-navigation/native react-native-screens
```

Then, run

```console
cd ios && pod install && cd ..
```

Finally, run

```console
npx react-native run-ios
```

**Note:** These views are wrappers of <a href="https://reactnavigation.org/docs/getting-started/">react-navigation</a> components.

## Usage

Import the components you need like this

```javascript
import { VStack, Text, Button } from 'swiftui-react-native';
```

And display them like this

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
