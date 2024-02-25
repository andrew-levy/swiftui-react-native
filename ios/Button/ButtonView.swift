import SwiftUI

struct ButtonView: View {
  @ObservedObject var props: ButtonProps
  var body: some View {
    if #available(iOS 15.0, *) {
      Button(props.title) {
        props.onEvent(["onAction": true])
      }
      .reactNativeViewModifiers(mods: props.modifiers)
    }
  }
}


