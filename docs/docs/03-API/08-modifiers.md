---
title: Modifiers
---

SwiftUI has a large selection of built-in modifiers that allow you to easily customize your views (padding, font, foregroundColor, cornerRadius, etc.) In this library, modifiers are implemented as props.

Here's a list of the modifer props that are available to most views:

**`Modifiers`:**

- `backgroundColor: Color`
- `border: Border`
- `cornerRadius: number`
- `scaleEffect: number`
- `rotationEffect: Rotation`
- `frame: Frame`
- `opacity: number`
- `onAppear: () => void`
- `onDisappear: () => void`
- `padding: Padding`
- `shadow: Shadow`
- `style: StyleProp<ViewStyle | TextStyle | ImageStyle>`
- `zIndex: number`

And for any views that deal with text:

**`TextModifiers`:**

- `customFont: string`
- `font: Font`
- `fontSize: number`
- `fontWeight: FontWeight`
- `foregroundColor: string`

Shapes inherit all of the view modifiers with a few exceptions. The prop `fill` is used instead of `backgroundColor`, and `frame` is required and defined a bit differently:

**`ShapeModifiers`:**

- `fill: Color`
- `frame: ShapeFrame`
