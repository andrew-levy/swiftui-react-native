import SwiftUI
import ExpoModulesCore

class TextProps: ObservableObject {
  @Published var text: String = ""
  @Published var modifiers: [[String: Any]] = []
  @Published var children: [UIView]?
  @Published var onEvent: EventDispatcher
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}
