import SwiftUI
import ExpoModulesCore

struct SpacerView: View {
  @ObservedObject var props: SpacerProps
  
  var body: some View {
    Spacer()
    .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
  }
}

