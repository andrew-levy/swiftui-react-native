# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 7.0.0 (2026-11-22)

v7 is a rewrite of swiftui-react-native. Every view and modifier now comes from the SwiftUI in Apple's SDK, so the library follows SwiftUI itself instead of a hand-picked subset of it. Your JSX renders real SwiftUI, typed end to end.

This release has breaking changes. See [Upgrading from v6](#upgrading-from-v6) below.

```sh
npm install swiftui-react-native react-native-nitro-modules
cd ios && pod install
```

Documentation: [swiftui.rit3zh.dev](https://swiftui.rit3zh.dev)

### Highlights

- **All of SwiftUI, typed.** 108 views and 438 modifiers, generated from Apple's SDK. Each one comes with Apple's documentation, the SwiftUI declaration it maps to and the iOS version it needs.
- **Built on the New Architecture.** Fabric components, Codegen and Nitro Modules. Expo Modules is no longer required, so it works in bare React Native apps as well as in Expo development builds.
- **Modifiers chain the way they do in SwiftUI.**

  ```tsx
  <Text modifiers={compose().font('title').bold().foregroundStyle('secondary')}>Hello</Text>
  ```

- **iOS 26 and Liquid Glass.** `GlassEffectContainer`, the `glassEffect` modifier, `ConcentricRectangle`, `Tab` and `ToolbarSpacer`.
- **State that SwiftUI can observe.** `useBinding`, `Observable` and `ObservableObject` with `useObservable` and `useStateObject`, environment objects with `useEnvironment` and `useEnvironmentObject`, and focus with `useFocusedValue` and `useFocusedObject`.
- **Drawing.** `Path`, `Canvas` and custom shapes made with `createShape`.
- **Animation.** `PhaseAnimator`, `KeyframeAnimator` and `TimelineView`.
- **Works with more than the newest Xcode.** It builds with Xcode 26.0 and newer. APIs that are newer than your Xcode are left out at compile time and report "unavailable" instead of breaking the build.

### Requirements

- iOS
- React Native 0.80 or newer with the New Architecture
- `react-native-nitro-modules` 0.37 or newer
- Xcode 26.0 or newer
- With Expo, a development build (Expo Go isn't supported)

### Upgrading from v6

- Turn on the New Architecture and install `react-native-nitro-modules`.
- Modifiers are no longer props. Move them into the `modifiers` prop:

  ```tsx
  // v6
  <Text font="title" padding={12}>Hello</Text>

  // v7
  <Text modifiers={compose().font('title').padding(12)}>Hello</Text>
  ```

- Props follow SwiftUI's initializers. For example, `Button` takes `onPress` and its label as children, and `TextField` takes its placeholder as children:

  ```tsx
  <TextField text={name}>Name</TextField>
  <Button onPress={save}>Save</Button>
  ```

### Since 7.0.0-beta.2

- Documentation in the types is no longer cut off mid-sentence, so editor hovers show Apple's full text.

### Thank you

Thanks to [@andrew-levy](https://github.com/andrew-levy) for creating swiftui-react-native, and to everyone who tried the betas and reported issues.

**Full changelog:** [v6.3.0...v7.0.0](https://github.com/andrew-levy/swiftui-react-native/compare/v6.3.0...v7.0.0)

# 7.0.0-beta.2 (2026-11-20)

- Builds with Xcode 26.0 and newer, not only the latest Xcode. APIs newer than your Xcode are left out at compile time and report "unavailable".
- Xcode older than 26 now gets one clear error instead of hundreds.
- Fixed missing iOS version checks that could misbehave on older iPhones.

# 7.0.0-beta.1 (2026-11-19)

- New documentation site at [swiftui.rit3zh.dev](https://swiftui.rit3zh.dev). The package homepage now points there.
- A shorter README with a new banner, install steps and a usage example.

# 7.0.0-beta.0 (2026-11-19)

**Note:** v7 is a rewrite and this is its first beta. It has breaking changes, and APIs may still change between betas. Install it with `npm install swiftui-react-native@next`.

### Highlights

- Built on the New Architecture with Fabric components, Codegen and Nitro Modules. Expo Modules is no longer required, so it works in bare React Native apps as well as Expo development builds.
- The API is generated from the SwiftUI in Apple's SDK: 107 views and about 400 modifiers. Each one is typed and documented with the SwiftUI declaration it maps to and the iOS version it needs.
- iOS 26 APIs such as `GlassEffectContainer`, the `glassEffect` modifier, `ConcentricRectangle`, `Tab` and `ToolbarSpacer`.
- Modifiers chain like they do in SwiftUI: `<Text modifiers={compose().font('title').bold()}>Hello</Text>`.
- State that SwiftUI can observe: `useBinding`, `Observable` and `ObservableObject` with `useObservable` and `useStateObject`, environment objects with `useEnvironment` and `useEnvironmentObject`, and focus with `useFocusedValue` and `useFocusedObject`.
- Drawing with `Path`, `Canvas` and custom shapes made with `createShape`.
- Animation views: `PhaseAnimator`, `KeyframeAnimator` and `TimelineView`.

### Breaking changes

- Requires the New Architecture, React Native 0.80 or newer, and `react-native-nitro-modules` 0.37 or newer.
- Modifiers are no longer props. Move them into the `modifiers` prop:

  ```tsx
  // v6
  <Text font="title" padding={12}>Hello</Text>

  // v7
  <Text modifiers={compose().font('title').padding(12)}>Hello</Text>
  ```

- Props follow SwiftUI's initializers. For example, `Button` takes `onPress` and its label as children, and `TextField` takes its placeholder as children:

  ```tsx
  <TextField text={name}>Name</TextField>
  <Button onPress={save}>Save</Button>
  ```

- iOS only.

### Known issues

- Some of the v6 demos in the example app haven't been moved to the new components yet.

# 6.3.0 (2024-05-28)

- New Menu and Divider components ([#41](https://github.com/andrew-levy/swiftui-react-native/pull/41) by [andrew-levy](https://github.com/andrew-levy))
- New Button prop `systemImage` ([#41](https://github.com/andrew-levy/swiftui-react-native/pull/41) by [andrew-levy](https://github.com/andrew-levy))
- New modifier: `disabled` ([#42](https://github.com/andrew-levy/swiftui-react-native/pull/42) by [andrew-levy](https://github.com/andrew-levy))

# 6.2.0 (2024-05-25)

- Added `compositingGroup` prop ([#40](https://github.com/andrew-levy/swiftui-react-native/pull/40) by [andrew-levy](https://github.com/andrew-levy))
- Added `linearGradient` property to `foregroundStyle` and `background` props ([#40](https://github.com/andrew-levy/swiftui-react-native/pull/40) by [andrew-levy](https://github.com/andrew-levy))

# 6.1.0 (2024-05-22)

- Updated frame prop to allow for `maxWidth`, `maxHeight`, `minWidth`, and `minHeight`. They can also accept `"infinity"` as a value. ([#39](https://github.com/andrew-levy/swiftui-react-native/pull/39) by [andrew-levy](https://github.com/andrew-levy))
- Added `lineLimit`, `fixedSize` and `ignoresSafeArea` modifier props ([#39](https://github.com/andrew-levy/swiftui-react-native/pull/39) by [andrew-levy](https://github.com/andrew-levy))
- Buttons can define content via children ([#39](https://github.com/andrew-levy/swiftui-react-native/pull/39) by [andrew-levy](https://github.com/andrew-levy))
- Fixes picker bug when no width and height are passed ([#39](https://github.com/andrew-levy/swiftui-react-native/pull/39) by [andrew-levy](https://github.com/andrew-levy))

# 6.0.0 (2024-05-02)

**Note:** This is the first major release that uses real SwiftUI views under the hood. This release has breaking changes.
