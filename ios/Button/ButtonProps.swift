import SwiftUI
import ExpoModulesCore

class ButtonProps: ObservableObject {
  @Published var title: String? = nil
  @Published var role: String? = nil
  @Published var systemImage: String? = nil
  @Published var onEvent: EventDispatcher
  @Published var children: [UIView]?
  @Published var modifiers: [[String: Any]] = []
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}
