import SwiftUI

struct ButtonView: View {
  @ObservedObject var props: ButtonProps
  var body: some View {
     Button(props.text) {
       props.onAction()
     }
    .modifier(ReactNativeViewModifiers(mods: props.modifiers))
  }
}


