import SwiftUI
import ExpoModulesCore

struct HStackView: View {
  @ObservedObject var props: HStackProps
  
  var body: some View {
    HStack{
      ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
        if props.children?[index].frame.width == 999 {
          Spacer()
        } else {
          RepresentableView(view: props.children?[index] ?? UIView())
            .frame(width: props.children?[index].frame.width, height: props.children?[index].frame.height)
            .border(Color.red,  width: 1)
        }
      }
    }
    .reactNativeViewModifiers(mods: props.modifiers)
  }
}

