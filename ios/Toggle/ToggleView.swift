import SwiftUI

struct ToggleView: View {
    @State var value = true
    @ObservedObject var props: ToggleProps
    var body: some View {
        if #available(iOS 16.0, *) {
            Toggle(props.title ?? "", isOn: $props.isOn)
              .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
              .onChange(of: props.isOn) { newValue in
                props.onEvent([
                  "onValueChange": newValue
                ])
              }
        }
    }
}
