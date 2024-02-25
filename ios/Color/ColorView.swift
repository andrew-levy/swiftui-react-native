import SwiftUI

struct ColorView: View {
  @ObservedObject var props: ColorProps
  var body: some View {
    getColor(props.color)
      .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
  }
}
