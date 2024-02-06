import SwiftUI
import ExpoModulesCore

class StepperProps: ObservableObject {
  @Published var value: Double = 0.0
  @Published var step: Double = 1.0
  @Published var labelText: String?
  @Published var range: [Double] = [-100, 100]
  @Published var modifiers: [[String: Any]] = []
  @Published var onValueChange: EventDispatcher
  init(onValueChange: EventDispatcher) {
    self.onValueChange = onValueChange
  }
}
