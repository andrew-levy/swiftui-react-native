import SwiftUI
import ExpoModulesCore

struct GroupView: View {
  @ObservedObject var props: GroupProps
  
  var body: some View {
    Group {
      ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
        RepresentableView(view: props.children?[index] ?? UIView())
          .frame(width: props.children?[index].frame.width, height: props.children?[index].frame.height)
      }
    }
    .reactNativeViewModifiers(mods: props.modifiers)
  }
}

