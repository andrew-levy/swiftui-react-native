import SwiftUI
import ExpoModulesCore

class ButtonProps: ObservableObject {
  @Published var title: String = ""
  @Published var onAction: EventDispatcher
  @Published var children: [UIView]?
  @Published var modifiers: [[String: Any]] = []
  init(onAction: EventDispatcher) {
    self.onAction = onAction
  }
}
