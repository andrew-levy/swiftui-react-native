import SwiftUI
import ExpoModulesCore

struct DividerView: View {
  @ObservedObject var props: DividerProps
  
  var body: some View {
    Divider()
    .reactNativeViewModifiers(mods: props.modifiers)
  }
}

