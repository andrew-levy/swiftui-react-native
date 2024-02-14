import SwiftUI
import ExpoModulesCore

class HStackProps: ObservableObject {
  @Published var children: [UIView]?
  @Published var modifiers: [[String: Any]] = []
}
