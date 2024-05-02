import SwiftUI
import ExpoModulesCore

class TextFieldProps: ObservableObject {
  @Published var text: String = ""
  @Published var type: String = "textfield"
  @Published var placeholder: String = ""
  @Published var modifiers: [[String: Any]] = []
  @Published var onEvent: EventDispatcher
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}
