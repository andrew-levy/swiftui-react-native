[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/hugemathguy)

# SwiftUI React Native

<img class="cover" style="border-radius: 20px; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; margin-bottom: 20px" src="assets/cover.png" />

Bringing the best **SwiftUI** features to your **React Native** app :rocket:

## Documentation

Check out the [official documentation](https://swiftui-react-native.vercel.app).

## Example Project

Check out the [example project](./example/).

## To convert:

- Image ✅ (copy over sfsymbol code)
- ProgressView ✅
- Stepper ✅
- Shapes ✅ (Rectangle, Circle, Ellipse, Capsule, Ellipse)
- Toggle ✅
- ColorPicker ✅
- DatePicker ✅
- Picker ✅
- Slider ✅
- Color ✅
- Label ✅
- Text ✅
- Button ✅
- SecureField ✅
- TextEditor ✅
- TextField ✅

- GeometryReader

## To add:

- HStack ✅
- List ✅
- VStack ✅
- ZStack ✅
- Spacer ✅

Not doing (yet):

- SFSymbol all custom modifiers support
- Section
- Group
- NavigationStack
- NavigationLink
- GeometryReader (Not doing)
- ForEach (Not doing)
- EnvironmentProvider (Not doing)

## to do:

- add swiftui versions ✅
- props as modifiers for all components ✅
- Figure out Color vs UIColor ✅
- support bindings + state/onchange ✅
- ensure android fallbacks? ✅
- experimental api
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
VStack([
    Text("Hello").padding()
    ColorPicker(selection: color)
])
.frame({width: 100, height: 100})
```
