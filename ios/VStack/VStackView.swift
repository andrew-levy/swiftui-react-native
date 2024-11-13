import SwiftUI
import ExpoModulesCore

struct VStackView: View {
  @ObservedObject var props: VStackProps
  
  var body: some View {
    VStack(alignment: props.alignment, spacing:  props.spacing != nil ? CGFloat(props.spacing!) : nil) {
      ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
        if ((props.children?[index].subviews.first(where: {$0 is SpacerExpoView} )) != nil) {
          Spacer()
        } else {
          RepresentableView(view: props.children?[index] ?? UIView())
            .frame(width: props.children?[index].frame.width, height: props.children?[index].frame.height)
        }
      }
    }
    .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
  }
}

