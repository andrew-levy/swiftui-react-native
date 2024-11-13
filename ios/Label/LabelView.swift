import SwiftUI

struct LabelView: View {
  @ObservedObject var props: LabelProps
  var body: some View {
    if #available(iOS 14.0, *) {
      Label(props.title, systemImage: props.systemImage)
        .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
    }
  }
}
