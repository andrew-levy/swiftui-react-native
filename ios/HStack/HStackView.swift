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
    .reactNativeViewModifiers(
      mods: props.modifiers,
      lifecycleModifier: LifecycleModifier(onAppear: props.onAppear, onDisappear: props.onDisappear),
      sheetModifier: SheetModifier(onSheetDismissed: props.onSheetDismissed,
                                   isSheetPresented: $props.isSheetPresented,
                                   sheetContent: props.sheetContent ?? UIView())
    )
  }
}

