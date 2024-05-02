import SwiftUI

struct PickerView: View {
  @ObservedObject var props: PickerProps
  
  var body: some View {
    if #available(iOS 14.0, *) {
      Picker("", selection: $props.selection) {
        ForEach(props.options, id: \.self) { option in
          Text(option)
        }
      }
      .reactNativeViewModifiers(mods: props.modifiers)
      .onChange(of: props.selection) { newValue in
        props.onEvent([
          "onValueChange": newValue
        ])
      }
    }
  }
}
