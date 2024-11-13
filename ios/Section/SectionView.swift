import SwiftUI
import ExpoModulesCore

struct SectionView: View {
  @ObservedObject var props: SectionProps
  
  var body: some View {
    EmptyView()
      .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
  }
}

