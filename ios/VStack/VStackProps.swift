import SwiftUI
import ExpoModulesCore

class VStackProps: ObservableObject {
  @Published var children: [UIView]?
  @Published var modifiers: [[String: Any]] = []
}
