import SwiftUI
import ExpoModulesCore

class PickerProps: ObservableObject {
  @Published var selection: String = ""
  @Published var options: [String] = []
  @Published var onSized: EventDispatcher
  @Published var modifiers: [[String: Any]] = []
  @Published var onValueChange: EventDispatcher
  
  init(onSized: EventDispatcher, onValueChange: EventDispatcher) {
    self.onSized = onSized
    self.onValueChange = onValueChange
  }
}
