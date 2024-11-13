import SwiftUI
import ExpoModulesCore

struct ZStackView: View {
  @ObservedObject var props: ZStackProps
  
  var body: some View {
    ZStack(alignment: props.alignment) {
      ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
        RepresentableView(view: props.children?[index] ?? UIView())
          .frame(width: props.children?[index].frame.width, height: props.children?[index].frame.height)
      }
    }
    .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
  }
}

