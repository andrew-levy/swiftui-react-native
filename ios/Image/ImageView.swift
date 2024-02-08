import SwiftUI

struct ImageView: View {
  @ObservedObject var props: ImageProps
  var body: some View {
    Image(systemName: props.systemName)
      .reactNativeViewModifiers(mods: props.modifiers)
  }
}
