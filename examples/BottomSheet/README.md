# Bottom Sheet

A Bottom Sheet is an animated modal to show and and content by sliding the sheet up and down, respectively.

## Props

header
content
snapPoints

## swiftui-react-native

```jsx
import { BottomSheet, Text } from 'swiftui-react-native';
```

```jsx
<BottomSheet
  header='View More'
  content={<Text>Here is some content!</Text>}
  snapPoints={['half']}
/>
```

## SwiftUI

```swift
GeometryReader { geometry in
        VStack(spacing: 0) v{
            self.indicator.padding()
            self.content
        }
        .frame(width: geometry.size.width, height: self.maxHeight, alignment: .top)
        .background(Color(.secondarySystemBackground))
        .cornerRadius(Constants.radius)
        .frame(height: geometry.size.height, alignment: .bottom)
        .offset(y: max(self.offset + self.translation, 0))
        .animation(.interactiveSpring(), value: isOpen)
        .animation(.interactiveSpring(), value: translation)
        .gesture(
            DragGesture().updating(self.$translation) { value, state, _ in
                state = value.translation.height
            }.onEnded { value in
                let snapDistance = self.maxHeight * Constants.snapRatio
                guard abs(value.translation.height) > snapDistance else {
                    return
                }
                self.isOpen = value.translation.height < 0
            }
        )
    }
```
