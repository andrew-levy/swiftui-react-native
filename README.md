# react-native-swiftui

## What is it?
SwiftUI is awesome. So is React Native! This library aims to leverage some of the best SwiftUI features in React Native applications.

## Views
 
 ### Stacks
  - **VStack:** Vertical stack
  - **HStack:** Horizontal stack
  - **ZStack:** Overlay stack
 ### UI Elements
 - **Button:** A clickable element that performs an action
 - **Image:** An image or icon
 - **Link:** An external link redirecting to the browser
 - **Spacer:** Space in between views (horizontal or vertical)
 - **Text:** A text element
 - **TextField:** A text input element
 - **Label:** An element with text and an icon/image
 
 ### Views/Lists
  - **ScrollView:** A scrollable view
  - **List:** A formatted list
 
 ### Navigation
  - **NavigationView:** Navigation container
  - **NavigationStack:** A collection of naviagble views
  - **NavigationLink:** A link to another view
  - **TabView:** A tab bar view
 

react-native-swiftui can help SwiftUI developers ease their way into React development, and vice versa.

## Usage

Import the components you need like this:

```javascript
import { VStack, Text, Button } from 'react-native-swiftui';
```

And display them like this:
```jsx
return (
  <VStack 
    aligment='leading'
    background='systemGray6'
    padding={20}
  >
    <Text font='title'>Some cool text</Text>
    <Button action={() => console.log('Button pressed')}>
      <Text>Click this cool button</Text>
    </Button>
  </VStack>
);
```

## Features
- Components/Views
- Custom Hooks
- Native iOS themes and colors
- Pre-styled components (`examples/`)
