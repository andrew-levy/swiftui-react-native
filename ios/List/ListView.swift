import SwiftUI
import ExpoModulesCore

struct ListView: View {
  @ObservedObject var props: ListProps
  
  var body: some View {
    if #available(iOS 15, *) {
      List {
        Section(content: {
          ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
            RepresentableView(view: props.children?[index] ?? UIView())
              .frame(width: props.children?[index].frame.width, height: props.children?[index].frame.height)
          }
        }, header: {
          Text("Fonts")
        }, footer: {
          EmptyView()
        })
      }
      .reactNativeViewModifiers(mods: props.modifiers)
    }
  }
}

