import SwiftUI
import ExpoModulesCore

class PickerProps: ObservableObject {
  @Published var selection: String = ""
  @Published var options: [String] = []
  @Published var modifiers: [[String: Any]] = []
  @Published var onEvent: EventDispatcher
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}
