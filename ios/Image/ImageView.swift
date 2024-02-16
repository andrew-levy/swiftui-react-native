import SwiftUI

struct ImageView: View {
  @ObservedObject var props: ImageProps
  var body: some View {
    if #available(iOS 16.0, *) {
      Image(systemName: props.systemName, variableValue: props.variableValue)
        .reactNativeViewModifiers(mods: props.modifiers)
    } else {
      Image(systemName: props.systemName)
        .reactNativeViewModifiers(mods: props.modifiers)
    }
  }
}
