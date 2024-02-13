import SwiftUI
import ExpoModulesCore

class DatePickerProps: ObservableObject {
  @Published var label: String = ""
  @Published var selection: String = ""
  @Published var displayedComponents: [String] = []
  @Published var modifiers: [[String: Any]] = []
  @Published var onValueChange: EventDispatcher
  init(onValueChange: EventDispatcher) {
    self.onValueChange = onValueChange
  }
}
