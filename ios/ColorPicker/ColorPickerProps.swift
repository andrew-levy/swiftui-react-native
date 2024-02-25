import SwiftUI
import ExpoModulesCore

class ColorPickerProps: ObservableObject {
  @Published var title: String = ""
  @Published var selection: UIColor = .white
  @Published var modifiers: [[String: Any]] = []
  @Published var supportsOpacity = true
  @Published var onEvent: EventDispatcher
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}
