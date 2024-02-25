import SwiftUI
import ExpoModulesCore

class ButtonProps: ObservableObject {
  @Published var title: String = ""
  @Published var onEvent: EventDispatcher
  @Published var children: [UIView]?
  @Published var modifiers: [[String: Any]] = []
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}
