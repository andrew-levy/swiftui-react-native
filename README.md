# swiftui-react-native

![swiftui-rn](/assets/swiftuirn.png?raw=true)

## What is it?

SwiftUI is awesome. So is React Native! This library aims to recreate some of the best SwiftUI features in React Native applications.

- :white_check_mark: Written in TypeScript
- :white_check_mark: Animations with Reanimated v2
- :white_check_mark: Built-in dark mode

## What do you get?

### Stacks :pancakes: :abcd:

- **VStack:** Vertical stack
- **HStack:** Horizontal stack
- **ZStack:** Overlay stack
- **Spacer:** Space in between stacks

### Views :eyes: :iphone:

- **Text:** Text view
- **TextField:** Text input view
- **Label:** View with text and an icon/image
- **Button:** Clickable view that performs an action
- **Image:** Image or icon (supports SF Symbols)
- **Link:** External link redirecting to the browser
- **List:** List view
- **ProgressView:** Progress indicator views

### Controls :control_knobs: :bulb:

- **Toggle:** Toggle control to switch a value on/off
- **Slider:** Sliding value selector
- **Stepper:** Control to increment and decrement a value

### Providers :new_moon_with_face: :sunny:

- **ColorSchemeProvider:** Provides context for the current color scheme

### Hooks :fishing_pole_and_fish:

- **useBinding:** Create and use a bindable value that a view can read and write to
- **useAlert:** Show an alert based on some condition
- **useOnAppear:** Perform an action when the view appears
- **useOnDisappear:** Perform an action when the view disappears
- **useColorScheme:** Access the current color scheme and update it
- **useUIColor:** Access dynamic UI colors based off of the current color scheme

### Utilities :wrench: :rainbow:

- **ForEach:** A function to dynamically render multiple views
- **UIColor:** A collection of light and dark UI color values
- **Font:** A collection of text font options
- **FontWeight:** A collection of font weight options
- **Alignment:** A collection of horizontal and vertical alignments

## Installation

**Step 1:** Install the package in your React Native project

```console
yarn add swiftui-react-native
```

**Step 2:** Add the following dependencies

**iOS:**

```console
yarn add react-native-reanimated react-native-gesture-handler react-native-sfsymbols
```

:information_source: `react-native-reanimated` requires extra steps to set up. Complete them [here](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/).

:information_source: `react-native-gesture-handler` requires extra steps to set up. Complete them [here](https://docs.swmansion.com/react-native-gesture-handler/docs/).

:information_source: `react-native-sfsymbols` requires extra steps to set up. Complete them [here](https://github.com/birkir/react-native-sfsymbols).

**android:**

```console
yarn add react-native-reanimated react-native-gesture-handler
```

:information_source: `react-native-reanimated` requires extra steps to set up. Complete them [here](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/).

:information_source: `react-native-gesture-handler` requires extra steps to set up. Complete them [here](https://docs.swmansion.com/react-native-gesture-handler/docs/).

**Step 3:** Now run

```console
npx react-native start
```

You should be all set now!

:information_source: NOTE: If you run into any errors during installation, try stopping metro and run

```console
yarn --reset-cache
```

## Usage

```jsx
import {
  VStack,
  Text,
  Button,
  useBinding,
  UIColor,
  Font,
  Alignment,
} from 'swiftui-react-native';

function App() {
  const text = useBinding('');
  return (
    <VStack
      aligment={Alignment.leading}
      backgroundColor={UIColor.light.systemGray6}
      padding={{ leading: 30 }}
      cornerRadius={20}
    >
      <Text font={Font.title}>Some cool text</Text>
      <TextField text={text} placeholder='Name' />
      <Button action={doSomething}>
        <Text>Click the cool button</Text>
      </Button>
    </VStack>
  );
}
```

vs. SwiftUI...

```swift
struct App: View {
  @State var text = "";
  var body: some View {
    VStack(alignment: .leading) {
      Text("Some cool text").font(.title)
      TextField("Name", text: $text)
      Button(action: doSomething) {
        Text("Click the cool button")
      }
    }.background(Color(UIColor.systemGray6))
    .padding(.leading, 30)
    .cornerRadius(20)
  }
}
```

## Documentation

Read the documentation [here](README-docs.md)
