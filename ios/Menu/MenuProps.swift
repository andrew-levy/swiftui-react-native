import SwiftUI
import ExpoModulesCore

class MenuProps: ObservableObject {
  @Published var actions: [[String: Any]] = []
  @Published var onEvent: EventDispatcher
  @Published var children: [UIView]?
  @Published var modifiers: [[String: Any]] = []
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}
