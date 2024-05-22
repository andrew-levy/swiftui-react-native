import SwiftUI

struct MenuView: View {
  @ObservedObject var props: MenuProps

  var body: some View {
    if #available(iOS 15.0, *) {
      Menu("title") {
        Button("hi world") {
          print("yo")
        }
        ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
          RepresentableView(view: props.children?[index] ?? UIView())
        }
      }
      .reactNativeViewModifiers(mods: props.modifiers)
    }
  }
}
