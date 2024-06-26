import SwiftUI
import ExpoModulesCore

class VStackProps: ObservableObject {
  @Published var alignment: HorizontalAlignment = .center
  @Published var spacing: Float? = nil
  @Published var children: [UIView]?
  @Published var modifiers: [[String: Any]] = []
  @Published var onEvent: EventDispatcher
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}
