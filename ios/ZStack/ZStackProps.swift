import SwiftUI
import ExpoModulesCore

class ZStackProps: ObservableObject {
  @Published var alignment: Alignment = .center
  @Published var children: [UIView]?
  @Published var modifiers: [[String: Any]] = []
  @Published var onEvent: EventDispatcher
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}
