# Runtime

What ships in the npm package: the native runtime, the TypeScript API, and generated code.

| Directory | Contents |
| --- | --- |
| `apple/` | Swift and Objective-C++: hosting, Fabric views, decoding, recorded programs |
| `cpp/` | Platform-independent C++: shadow nodes, measurement, layout |
| `react-native/` | TypeScript: the public API, the JavaScript runtime and Fabric specs |

`apple/Generated`, `cpp/generated`, `react-native/generated` and `react-native/specs/generated` are
generated. Do not edit them.

Hand-written Swift must sort after Nitrogen's `Func_*.swift` by file name, or the pod fails to compile.
That is why such files are prefixed `SUI`. See `apple/README.md`.
