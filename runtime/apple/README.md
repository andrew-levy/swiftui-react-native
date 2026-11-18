# ios/

Native iOS sources of the `SwiftUIReactNative` pod (see `SwiftUIReactNative.podspec`).

| Folder                | Language     | Contents                                                                                     |
| --------------------- | ------------ | -------------------------------------------------------------------------------------------- |
| `SwiftUIReactNative.h`| ObjC         | Public umbrella header of the module (imported by the generated Swift header).               |
| `Generated/`          | ObjC++/Swift | Every generated component, modifier and value: Fabric component views (`SUIGeneratedComponents.mm`) and Swift hosts. Written by the generator, do not edit. |
| `Runtime/`            | Swift        | What generated code runs on: `SUINode` and its host, decoding, context, handles, recorded programs and stand-ins. |
| `Fabric/`             | ObjC++       | Base component view: `SUIComponentView`, and the `SUI_GENERATED_COMPONENT_VIEW` macro every generated component expands. |
| `Protocols/`          | ObjC         | `SUIHostView.h`: the contract between Fabric (ObjC++) and the Swift hosts.                   |
| `Hosting/`            | Swift        | `SwiftUIHostView` (hosting controller, children, measurement loop) and embedding React children in SwiftUI (`ReactChildView`). |
| `Events/`             | ObjC++       | Typed `onEvent` dispatch for Codegen emitters.                                               |
| `Utils/`              | Swift/ObjC++ | Prop conversion/diffing (`SUI_DIFF_PROP`), JSON, color parsing, host lookup helpers.         |
| `Modules/<Name>/`     | Swift        | Nitro HybridObject implementations (specs in `runtime/react-native/nitro/specs`, bindings in `nitrogen/generated`). |

Why the split between Objective-C++ and Swift: Fabric component views must subclass
`RCTViewComponentView` (an Objective-C++ class with C++ members), which Swift cannot do.
Nitro builds this pod with Swift/C++ interop and without a generated `-Swift.h` header, so
the Objective-C++ side never imports Swift directly: it instantiates hosts by their
Objective-C runtime name and talks to them through the `SUIHostView` protocol.
