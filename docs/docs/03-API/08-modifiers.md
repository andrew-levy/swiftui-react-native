---
title: Modifiers
---

In SwiftUI, view modifiers allow you to easily change a view's appearance or behavior.

```swift
Text("Hello, world!")
    .font(.title)
    .foregroundColor(.green)
    .padding()
```

To approximate this in React Native, views are styled using props. Each prop corresponds to a modifier in SwiftUI.

## Full List

| Name                        | Type                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| padding                     | number \| boolean \| { leading?: number; top?: number; bottom?: number; trailing?: number; ... } |
| border                      | { color?: Color; width?: number; }                                                               |
| foregroundStyle             | Color \| Color[] \| LinearGradient                                                               |
| rotationEffect              | { degrees?: number; radians?: number; }                                                          |
| ignoresSafeArea             | boolean                                                                                          |
| lineLimit                   | number                                                                                           |
| fixedSize                   | boolean \| { horizontal: boolean; vertical: boolean };                                           |
| scaleEffect                 | number                                                                                           |
| shadow                      | { color?: Color; x?: number; y?: number; radius: number; opacity?: number; }                     |
| background                  | Color \| LinearGradient                                                                          |
| hidden                      | boolean                                                                                          |
| frame                       | Frame                                                                                            |
| zIndex                      | number                                                                                           |
| opacity                     | number                                                                                           |
| tint                        | Color                                                                                            |
| cornerRadius                | number                                                                                           |
| position                    | { x: number; y: number; }                                                                        |
| offset                      | { x: number; y: number; }                                                                        |
| animation                   | { type: 'spring' \| 'easeIn' \| 'easeOut' \| 'easeInOut' \| 'linear' \| ...; value: any; }       |
| contentTransition           | 'numericText' \| 'opacity' \| 'identity' \| 'interpolate' \| 'symbolEffect'                      |
| labelIsHidden               | boolean                                                                                          |
| blur                        | number                                                                                           |
| saturation                  | number                                                                                           |
| grayscale                   | number                                                                                           |
| brightness                  | number                                                                                           |
| contrast                    | number                                                                                           |
| blendMode                   | 'color' \| 'colorBurn' \| 'colorDodge' \| 'darken' \| 'difference' \| ...                        |
| compositingGroup            | boolean                                                                                          |
| mask                        | string                                                                                           |
| clipShape                   | 'circle' \| 'roundedRectangle' \| 'capsule' \| 'rectangle' \| 'ellipse' \| ...                   |
| environment                 | { colorScheme: 'light' \| 'dark'; }                                                              |
| textContentType             | 'name' \| 'namePrefix' \| 'givenName' \| 'middleName' \| ...                                     |
| keyboardType                | 'numberPad' \| 'phonePad' \| 'namePhonePad' \| 'emailAddress' \| ...                             |
| textInputAutocapitalization | 'never' \| 'words' \| 'sentences' \| 'characters';                                               |
| autocorrectionDisabled      | boolean\                                                                                         |
| resizable                   | boolean                                                                                          |
| imageScale                  | 'small' \| 'medium' \| 'large'                                                                   |
| symbolRenderingMode         | 'palette' \| 'monochrome' \| 'hierarchical' \| 'multicolor'                                      |
| fontSize                    | number                                                                                           |
| fontWeight                  | 'ultralight' \| 'thin' \| 'light' \| 'regular' \| ...                                            |
| font                        | 'body' \| 'callout' \| 'caption' \| 'caption2' \| ...                                            |
| bold                        | boolean                                                                                          |
| italic                      | boolean                                                                                          |
| strikethrough               | boolean \| { isActive: boolean; color?: Color; pattern?: 'dot' \| 'dash' \| ... }                |
| underline                   | boolean \| { isActive: boolean; color?: Color; pattern?: 'dot' \| 'dash' \| ... }                |
| buttonStyle                 | 'bordered' \| 'borderless' \| 'plain' \| 'borderedProminent'                                     |
| pickerStyle                 | 'wheel' \| 'segmented' \| 'menu'                                                                 |
| textFieldStyle              | 'plain' \| 'roundedBorder'                                                                       |
| listStyle                   | 'inset' \| 'grouped' \| 'plain' \| 'insetGrouped'                                                |
| sensoryFeedback             | { feedback: 'warning' \| 'error' \| 'success' \| ...; trigger: any; }                            |
| scrollDisabled              | boolean                                                                                          |
| onAppear                    | () => void                                                                                       |
| onDisappear                 | () => void                                                                                       |

### Order Matters

It's important to note that the order of modifiers matters. This is true for SwiftUI and for this library. For example,

```tsx
<VStack border={{ color: 'blue' }} padding />
```

produces a different result than

```tsx
<VStack padding border={{ color: 'blue' }} />
```

### Duplicate Modifiers

In SwiftUI, duplicate modifiers are allowed since modifiers build on top of each other. To achieve the same effect, we need a special API that allows us to iteratively build up a view with modifiers, while still rendering a JSX element. For this, see the Experimental API section.
