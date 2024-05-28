# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# Unreleased

- New Menu and Divider components
- New Button prop `systemImage`

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
