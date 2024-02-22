import SwiftUI
import ExpoModulesCore

class ColorProps: ObservableObject {
  @Published var color: String = "clear"
  @Published var modifiers: [[String: Any]] = []
}
