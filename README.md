[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/hugemathguy)

# SwiftUI React Native

<img class="cover" style="border-radius: 20px; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; margin-bottom: 20px" src="assets/cover.png" />

Bringing the best **SwiftUI** features to your **React Native** app :rocket:

## Documentation

Check out the [official documentation](https://swiftui-react-native.vercel.app).

## Example Project

Check out the [example project](./example/).

## To convert:

- Image ✅ (remove fallback? copy over sfsymbol code)
- ProgressView ✅
- Stepper ✅
- Shapes ✅ (Rectangle, Circle, Ellipse, Capsule)
- Toggle ✅
- ColorPicker ✅
- DatePicker ✅
- Picker ✅
- Slider ✅ (has a lot of bugs)
- Color ✅
  -------- These are all text based, need to figure out dynamic sizing --------
- Label ✅
- Text ✅
- Button
- Link
- ShareLink
- SecureField
- TextEditor
- TextField (combine these? ^^)

## To add:

- HStack ✅
- List ✅
- VStack ✅
- ZStack ✅
- Group ✅
- Spacer
- NavigationStack/NavigationView
- NavigationLink
- List.Section (Not doing)
- EnvironmentProvider
- Real UIColor values?

## to do:

- add swiftui versions
- props as modifiers for all components
- Figure out Color vs UIColor
- Add overlay, background
- SFSymbol all custom modifiers support
- support bindings + state/onchange
- if js only, need to support mapping modifers to styles
- experimental api
- ensure android fallbacks?
- ensure tree shaking

Option 1: Modifiers as props (Basic)

```tsx
<VStack frame={{width: 100, height: 100}}>
    <Text padding>Hello</Text>
    <ColorPicker selection={color}>
</VStack>
```

Option 2: Experimental API

```tsx
VStack(() => ([
    Text("Hello").padding()
    ColorPicker(selection: color)
]))
.frame({width: 100, height: 100})
```
