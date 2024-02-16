import SwiftUI
import ExpoModulesCore

class GroupProps: ObservableObject {
  @Published var children: [UIView]?
  @Published var modifiers: [[String: Any]] = []
}
