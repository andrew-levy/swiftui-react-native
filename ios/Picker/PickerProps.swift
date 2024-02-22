import SwiftUI
import ExpoModulesCore

class PickerProps: ObservableObject {
  @Published var selection: String = ""
  @Published var options: [String] = []
  @Published var modifiers: [[String: Any]] = []
  @Published var onValueChange: EventDispatcher
  
  init(onValueChange: EventDispatcher) {
    self.onValueChange = onValueChange
  }
}
