import SwiftUI
import ExpoModulesCore

class DividerProps: ObservableObject {
  @Published var modifiers: [[String: Any]] = []
  @Published var onEvent: EventDispatcher
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}
