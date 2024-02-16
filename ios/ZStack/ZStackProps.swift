import SwiftUI
import ExpoModulesCore

class ZStackProps: ObservableObject {
  @Published var children: [UIView]?
  @Published var modifiers: [[String: Any]] = []
}
