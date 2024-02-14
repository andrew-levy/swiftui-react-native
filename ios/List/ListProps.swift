import SwiftUI
import ExpoModulesCore

class ListProps: ObservableObject {
  @Published var children: [UIView]?
  @Published var modifiers: [[String: Any]] = []
}
