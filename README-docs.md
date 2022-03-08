## Documentation

### Modifiers

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

### Components

### `<Button />`

A button view that performs an action

| prop       | description                  | type                                                     | required | default     |
| ---------- | ---------------------------- | -------------------------------------------------------- | -------- | ----------- |
| `text`     | Button text                  | `string`                                                 | no       | `undefined` |
| `action`   | Function to execute on press | `() => void`                                             | no       | `undefined` |
| `children` | Button content               | `React.ReactElement<any>` or `React.ReactElement<any>[]` | no       | `null`      |

Button inherits all `Modifiers` and `TextModifers` as props.

### `<ColorSchemeProvider />`

Provides context for the current color scheme. Wrap your app in this component to access dynamic color palettes and color scheme functionality.

| prop                   | description          | type                  | required | default |
| ---------------------- | -------------------- | --------------------- | -------- | ------- |
| `preferredColorScheme` | Default color scheme | `'light'` or `'dark'` | no       | `light` |
| `children`             | Button content       | `React.ReactNode`     | yes      | `null`  |

### `<HStack />`

A stack that displays items horizontally.

| prop        | description                         | type                                                     | required | default    |
| ----------- | ----------------------------------- | -------------------------------------------------------- | -------- | ---------- |
| `spacing`   | Amount of space between stack items | `number`                                                 | no       | `0`        |
| `alignment` | Vertical alignment                  | `'top'` or `'bottom'` or `'center'`                      | no       | `'center'` |
| `children`  | Stack items                         | `React.ReactElement<any>` or `React.ReactElement<any>[]` | no       | `null`     |

VStack inherits all `Modifiers` as props.

### `<Image />`

An image view to display an asset, URI (or SF Symbol - iOS only)

| prop         | description                     | type                  | required | default     |
| ------------ | ------------------------------- | --------------------- | -------- | ----------- |
| `source`     | The image source (uri or asset) | `ImageSourcePropType` | no       | `undefined` |
| `systemName` | The SF Symbol name (iOS only)   | `string`              | no       | `undefined` |

Image inherits all `Modifiers` and `TextModifiers` as props.

:information_source: Check out [SF Symbols App](https://developer.apple.com/sf-symbols/) for a complete list of SF Symbols

:information_source: Using [react-native-sfsymbols](https://github.com/birkir/react-native-sfsymbols) under the hood! :star:

:information_source: Use the `systemName` prop for an SF Symbol or the `source` prop for a uri or asset image. When using an SF Symbol, use font modifiers to customize it.

### `<Label />`

A view that displays an icon and text

| prop          | description                         | type                | required | default     |
| ------------- | ----------------------------------- | ------------------- | -------- | ----------- |
| `spacing`     | Amount of space between stack items | `number`            | no       | `0`         |
| `systemImage` | The SF Symbol name (iOS only)       | `string`            | no       | `undefined` |
| `icon`        | The icon to display                 | `ReactElement<any>` | no       | `undefined` |
| `text`        | The label text                      | `string`            | no       | `undefined` |

Label inherits all `Modifiers` and `TextModifiers` as props.

:information_source: Choose between the `systemImage` prop for an SF Symbol and the `icon` prop for a custom icon. Supplying both props will result in displaying the custom icon only. When using an SF Symbol, use font modifiers to customize it.

### `<Link />`

A button that opens a URL in the browser

| prop          | description                         | type     | required | default     |
| ------------- | ----------------------------------- | -------- | -------- | ----------- |
| `destination` | URL the link will open in a browser | `string` | yes      | `undefined` |

Label inherits all of `Button`'s props.

### `<List />`

A list view

| prop       | description                                                                                          | type                                                     | required | default     |
| ---------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | -------- | ----------- |
| `header`   | List header                                                                                          | `string ` or ` ReactElement<any>`                        | no       | `undefined` |
| `footer`   | List footer                                                                                          | `string ` or ` ReactElement<any>`                        | no       | `undefined` |
| `inset`    | Gives the list rounded corners and adjusts list width to be inset from the edges of the parent view. | `boolean`                                                | no       | `false`     |
| `children` | List Rows                                                                                            | `React.ReactElement<any>` or `React.ReactElement<any>[]` | no       | `null`      |

List inherits all `Modifiers` as props.

### `<Slider />`

A sliding value selector

| prop            | description                                                                                                                                                                                    | type                           | required | default                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | -------- | -------------------------------- |
| `value`         | The stepper binding                                                                                                                                                                            | `Binding<number>`              | yes      | `undefined`                      |
| `step`          | The increment/decrement amount                                                                                                                                                                 | `number`                       | no       | `1`                              |
| `range`         | The range of values `[minNumber, maxNumber]`                                                                                                                                                   | `[number, number]`             | no       | `[0, 10]`                        |
| `updateOnSlide` | If true, the value will update as the slider is moving. If false, it will only update when the gesture has been completed. Setting this to true might cause some lag if the range is too wide. | `boolean`                      | no       | `true`                           |
| `tint`          | The slider accent fill-color                                                                                                                                                                   | `Color`                        | no       | `#0a84ff` (`UIColor.systemBlue`) |
| `onChange`      | Function to execute when the slider value changes                                                                                                                                              | `(v: Binding<number>) => void` | no       | `undefined`                      |

Slider inherits all `Modifiers` as props.

:information_source: Use the `useBinding` hook for this component to create a Binding value.

### `<Spacer />`

Fills space between stack items

### `<Stepper />`

A stepper component to incrememnt and decrement a value

| prop       | description                                        | type                           | required | default       |
| ---------- | -------------------------------------------------- | ------------------------------ | -------- | ------------- |
| `value`    | The stepper binding                                | `Binding<number>`              | yes      | `undefined`   |
| `step`     | The increment/decrement amount                     | `number`                       | no       | `1`           |
| `range`    | The range of values `[minNumber, maxNumber]`       | `[number, number]`             | no       | `[-100, 100]` |
| `onChange` | Function to execute when the stepper value changes | `(v: Binding<number>) => void` | no       | `undefined`   |

Stepper inherits all `Modifiers` as props.

:information_source: Use the `useBinding` hook for this component to create a Binding value.

### `<Text />`

A text component

| prop        | description          | type                                       | required | default     |
| ----------- | -------------------- | ------------------------------------------ | -------- | ----------- |
| `alignment` | Text alignment guide | `'leading'` or ` 'center'` or `'trailing'` | no       | `'center'`  |
| `textCase`  | Text case            | `'upper'` or ` 'lower'` or `'capitalize'`  | no       | `undefined` |
| `children`  | List Row content     | `React.ReactNode`                          | no       | `null`      |

Text inherits all `TextModifiers` as props.

### `<TextField />`

A single-line text field component

| prop          | description                                     | type                           | required | default     |
| ------------- | ----------------------------------------------- | ------------------------------ | -------- | ----------- |
| `text`        | Text binding                                    | `Binding<string>`              | yes      | `undefined` |
| `placeholder` | Placeholder text                                | `string`                       | no       | `undefined` |
| `onChange`    | Function to execute when the text value changes | `(v: Binding<string>) => void` | no       | `undefined` |

TextField inherits all `Modifiers` and `TextModifiers` as props.

:information_source: Use the `useBinding` hook for this component to create a Binding value.

### `<Toggle />`

A toggle component to switch between on and off values

| prop       | description                                       | type                            | required | default     |
| ---------- | ------------------------------------------------- | ------------------------------- | -------- | ----------- |
| `isOn`     | The toggle binding                                | `Binding<boolean>`              | yes      | `undefined` |
| `tint`     | The "on" toggle color                             | `Color`                         | no       | `undefined` |
| `onChange` | Function to execute when the toggle value changes | `(v: Binding<boolean>) => void` | no       | `undefined` |

Toggle inherits all `Modifiers` as props.

:information_source: Use the `useBinding` hook for this component to create a Binding value.

### `<VStack />`

A stack that displays items vertically

| prop       | description                         | type                                                     | required | default    |
| ---------- | ----------------------------------- | -------------------------------------------------------- | -------- | ---------- |
| spacing    | Amount of space between stack items | `number`                                                 | no       | `0`        |
| alignment  | The SF Symbol name (iOS only)       | `leading'` or `'trailing'` or `'center'`                 | no       | `'center'` |
| `children` | Stack items                         | `React.ReactElement<any>` or `React.ReactElement<any>[]` | no       | `null`     |

VStack inherits all `Modifiers` as props.

### `<ZStack />`

A vertical stack

| prop       | description                         | type                                                              | required | default    |
| ---------- | ----------------------------------- | ----------------------------------------------------------------- | -------- | ---------- |
| spacing    | Amount of space between stack items | `number`                                                          | no       | `0`        |
| alignment  | The SF Symbol name (iOS only)       | `{ vertical: VerticalAlignment horizontal: HorizontalAlignment} ` | no       | `'center'` |
| `children` | Stack items                         | `React.ReactElement<any>` or `React.ReactElement<any>[]`          | no       | `null`     |

HStack inherits all `Modifiers` as props.

### Shapes

The supported shapes are `Rectangle`, `RoundedRectangle`, `Capsule`, and `Circle`. They have the following props:

| prop    | description                 | type         | required | default            |
| ------- | --------------------------- | ------------ | -------- | ------------------ |
| `fill`  | The fill color of the shape | `Color`      | no       | `systemBackground` |
| `frame` | The frame of the shape      | `ShapeFrame` | yes      | `undefined`        |

Rectangle inherits all `Modifiers` and `ShapeModifers` as props.

### Hooks

#### `useAlert`

Display an alert message based on a condition

```jsx
const [show, setShow] = useState(false);
useAlert(show, {
  title: 'SwiftUI is Cool',
  message: 'So is React Native!',
  buttons: [{ text: 'Cancel', onPress: () => setShowAlert(false) }],
});
```

```jsx
<Button text="Show Alert" action={() => setShow(true)} />
```

#### `useBinding`

Create and use a bindable value that a view can read and write to. Learn more [here](#bindings).

```jsx
const text = useBinding('');
```

```jsx
<TextField text={text} />
```

#### `useColorScheme`

Display an alert message based on a condition

:information_source: `ColorSchemeProvider` is necessary in order to take full advantage of this hook. Will default to light if its not found.

```jsx
const { colorScheme, setColorScheme } = useColorScheme();
```

```jsx
<VStack backgroundColor={colorScheme === 'dark' ? '#000' : '#fff'}>
  <Button
    text="Dark Mode"
    action={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
  />
</VStack>
```

#### `useOnAppear`

Perform an action when the view appears

```jsx
useOnAppear(() => console.log('view appeared'));
```

#### `useOnAppear`

Perform an action when the view disappears

```jsx
useOnDisappear(() => console.log('view disappeared'));
```

#### `useUIColor`

Access dynamic UI colors based off of the current color scheme

:information_source: `ColorSchemeProvider` is necessary in order to take full advantage of this hook. Will default to light colors if its not found.

```jsx
const UIColor = useUIColor();
```

### Utilites

This package ships a few utility objects that make it easy to use constants like font names and colors without having to memorize them.

#### `ForEach`

A function that allows you map over an array to dynamically render a collection of views

```tsx
const options = ['Option 1', 'Option 2', 'Option 3'];
```

```tsx
<VStack>
  {ForEach(options, (option, i) => (
    <Text key={i}>{option}</Text>
  ))}
</VStack>
```

### Bindings

In **SwiftUI**, some views that update the value of a variable require you to pass in a binding of that value

```swift
@State var text = "";
```

```swift
TextField("Name", text: $text)
```

In this example, we pass a binding wrapper of the `text` state variable using the `$`. The `TextField` view is responsible for reading its current value as well as updating it when the user types into it.

In **React Native**, this is how you would accomplish the same thing

```jsx
const [text, setText] = useState('');
```

```jsx
<TextInput value={text} onChangeText={(newText) => setText(newText)} />
```

And this is _completely_ fine, but it would be nice if the view handled that logic for us.

In **swiftui-react-native**, the implementation is a combination of both approaches

```jsx
const text = useBinding('');
```

```jsx
<TextField text={text} />
```

Under the hood `useBinding` simply calls `useState` and returns an object that has `value` and `setValue` properties. Then, inside `TextField`, it will be able to access the text via `props.text.value` and update it via `props.text.setValue(newValue)`.
