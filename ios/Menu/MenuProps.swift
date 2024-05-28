import SwiftUI
import ExpoModulesCore

class MenuProps: ObservableObject {
  @Published var title: String = ""
  @Published var systemImage: String? = nil
  @Published var hasPrimaryAction: Bool = false
  @Published var actions: [[String: Any]] = []
  @Published var onEvent: EventDispatcher
  @Published var children: [UIView]?
  @Published var modifiers: [[String: Any]] = []
  init(onEvent: EventDispatcher) {
    self.onEvent = onEvent
  }
}
