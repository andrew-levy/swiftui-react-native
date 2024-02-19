import SwiftUI
import ExpoModulesCore

struct HStackView: View {
  @ObservedObject var props: HStackProps

  var body: some View {
    HStack {
      ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
        if ((props.children?[index].subviews.first(where: {$0 is SpacerExpoView} )) != nil) {
          Spacer()
        } else {
          RepresentableView(view: props.children?[index] ?? UIView())
            .frame(width: props.children?[index].frame.width, height: props.children?[index].frame.height)
        }
      }
    }
    .reactNativeViewModifiers(mods: props.modifiers)
    .sheet(isPresented: $props.isSheetPresented, onDismiss: {
      props.onSheetDismissed()
    }) {
      RepresentableView(view: props.sheetContent ?? UIView())
        .frame(width: props.sheetContent?.frame.width, height: props.sheetContent?.frame.height)
    }
  }
}

