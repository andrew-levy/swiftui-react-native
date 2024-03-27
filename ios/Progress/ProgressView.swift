import ExpoModulesCore
import SwiftUI

struct ProgressViewView: View {
  @ObservedObject var props: ProgressProps
  @State private var progress: Double = 0
  
  var body: some View {
    if #available(iOS 14.0, *) {
      if let value = props.value {
        ProgressView(value: progress, total: props.total) {
          Text(props.label)
        } currentValueLabel: {
          Text(props.currentValueLabel)
        }
        .reactNativeViewModifiers(mods: props.modifiers)
        .onAppear {
          withAnimation {
            progress = value
          }
        }
        .onChange(of: value) { newValue in
          withAnimation {
            progress = newValue
          }
        }
      } else {
        ProgressView() {
          Text(props.label)
        }
        .reactNativeViewModifiers(mods: props.modifiers)
      }
    }
  }
}
