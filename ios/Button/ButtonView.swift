import SwiftUI

struct ButtonView: View {
  @ObservedObject var props: ButtonProps
  var body: some View {
      Button(props.text) {
        props.onAction(["value": true])
      }
      .modifier(ReactNativeViewModifiers(mods: props.modifiers))
  }
}

