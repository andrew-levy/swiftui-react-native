import SwiftUI
import ExpoModulesCore

class HStackProps: ObservableObject {
  @Published var alignment: VerticalAlignment = .center
  @Published var spacing: Float? = nil
  @Published var children: [UIView]?
  @Published var sheetContent: UIView?
  @Published var modifiers: [[String: Any]] = []
  @Published var onEvent: EventDispatcher
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}
