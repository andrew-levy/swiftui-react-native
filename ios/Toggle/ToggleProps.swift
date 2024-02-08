import SwiftUI
import ExpoModulesCore

class ToggleProps: ObservableObject {
  @Published var isOn = false
  @Published var label: String?
  @Published var modifiers: [[String: Any]] = []
  @Published var onValueChange: EventDispatcher
  init(onValueChange: EventDispatcher) {
      self.onValueChange = onValueChange
  }
}
