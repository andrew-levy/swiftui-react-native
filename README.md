# react-native-swiftui

SwiftUI is awesome. So is React! This library allows you to use some of the features of SwiftUI without having to write a line of Swift code. 

## Usage

Import the components you need like this:

```javascript
import { VStack, Label, Button } from 'react-native-swiftui';
```

And display them like this:
```jsx
return (
  <VStack >
    <Label 
      text='A Cool Label' 
      image='path/to/image' 
    />
    <Button 
      text='A Cooler Button'
      action={() => console.log('Button pressed')}
    />
  </HStack>
);
```

## Features
- Components/Views
- Custom Hooks
- Native iOS themes and colors
- Pre-styled components (`examples/`)
