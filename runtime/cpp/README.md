# cpp/

Platform-independent C++ shared by the Fabric integration: shadow nodes, component
descriptors and the layout engine. Compiled into the `SwiftUIReactNative` pod, with this
folder on the header search path, so every include is written relative to `cpp/`
(e.g. `#include "layout/SwiftUIChildLayout.h"`).

Each layer depends only on the layers above it:

| Folder          | Contents                                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| `core/`         | Small shared utilities: math/tolerances (`SwiftUIMath.h`), pixel-grid rounding and hairlines.                  |
| `state/`        | Fabric state types. `SwiftUIHostStateData` carries SwiftUI's measurements from the native view to the shadow node. |
| `measurement/`  | Turns host state into a size for given Yoga constraints (`measureSwiftUIHost`).                                |
| `layout/`       | `SwiftUIChildLayout` lays out the React children a SwiftUI host embeds and writes the results back to the shadow tree. |
| `shadownodes/`  | `SwiftUIHostShadowNode`: the Fabric shadow node of every SwiftUI host (a state-measured leaf).                 |
| `generated/`    | `SwiftUIGeneratedComponentDescriptors.h`: binds each generated Codegen component to its shadow node. Written by the generator, do not edit. |

## Adding a component

Components are generated from Apple's SwiftUI declarations: run `bun run generate` rather than
adding one by hand. It writes the Codegen spec (`runtime/react-native/specs/generated`), the descriptor
(`generated/`), the native view and Swift host (`runtime/apple/Generated`) and the registry entry in
`package.json` (`codegenConfig.ios.components`).
