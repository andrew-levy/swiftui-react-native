import SwiftUI
import ExpoModulesCore

class ProgressProps: ObservableObject {
  @Published var value: Double? = nil
  @Published var total: Double = 1
  @Published var label: String = ""
  @Published var currentValueLabel: String = ""
  @Published var modifiers: [[String: Any]] = []
  @Published var onEvent: EventDispatcher
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}

