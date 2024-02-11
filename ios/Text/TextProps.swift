import SwiftUI
import ExpoModulesCore

class TextProps: ObservableObject {
  @Published var text: String = ""
  @Published var onSized: EventDispatcher
  @Published var modifiers: [[String: Any]] = []
  init(onSized: EventDispatcher) {
    self.onSized = onSized
  }
}
