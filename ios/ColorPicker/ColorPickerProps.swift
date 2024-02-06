import SwiftUI
import ExpoModulesCore

class ColorPickerProps: ObservableObject {
  @Published var label: String = ""
  @Published var selection: UIColor = .white
  @Published var range: [Int] = [-100, 100]
  @Published var modifiers: [[String: Any]] = []
  @Published var onValueChange: EventDispatcher
  init(onValueChange: EventDispatcher) {
    self.onValueChange = onValueChange
  }
}
