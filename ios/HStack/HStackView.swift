import SwiftUI
import ExpoModulesCore

struct HStackView: View {
  @ObservedObject var props: HStackProps
  
  var body: some View {
    HStack(alignment: props.alignment, spacing:  props.spacing != nil ? CGFloat(props.spacing!) : nil) {
      ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
        let child = props.children?[index] ?? UIView()
        if (child.subviews.first(where: {$0 is SpacerExpoView} )) != nil {
          Spacer()
        } else {
          RepresentableView(view: child)
            .frame(width: child.frame.width, height: child.frame.height)
        }
      }
    }
    .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
  }
}

