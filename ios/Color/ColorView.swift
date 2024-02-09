import SwiftUI

struct ColorView: View {
  @ObservedObject var props: ColorProps
  var body: some View {
    Color(props.color)
      .reactNativeViewModifiers(mods: props.modifiers)
  }
}
