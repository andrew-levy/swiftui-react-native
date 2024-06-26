import SwiftUI
import ExpoModulesCore

class ImageProps: ObservableObject {
  @Published var systemName: String = ""
  @Published var variableValue: Double = 1
  @Published var modifiers: [[String: Any]] = []
  @Published var onEvent: EventDispatcher
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}
