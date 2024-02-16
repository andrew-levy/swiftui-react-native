import SwiftUI
import ExpoModulesCore

class TextFieldProps: ObservableObject {
  @Published var text: String = ""
  @Published var type: String = "textfield"
  @Published var placeholder: String = ""
  @Published var onValueChange: EventDispatcher
  @Published var modifiers: [[String: Any]] = []
  
  init(onValueChange: EventDispatcher) {
    self.onValueChange = onValueChange
  }
}
