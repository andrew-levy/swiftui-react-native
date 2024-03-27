import SwiftUI
import ExpoModulesCore

class ToggleProps: ObservableObject {
  @Published var isOn = false
  @Published var label: String?
  @Published var modifiers: [[String: Any]] = []
  @Published var onEvent: EventDispatcher
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}
