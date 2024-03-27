import SwiftUI
import ExpoModulesCore

class ShapeProps: ObservableObject {
  @Published var type: String = ""
  @Published var cornerRadius: Double = 0.0
  @Published var cornerRadii: [String: Double] = [:]
  @Published var modifiers: [[String: Any]] = []
  @Published var onEvent: EventDispatcher
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}
