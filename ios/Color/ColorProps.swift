import SwiftUI
import ExpoModulesCore

class ColorProps: ObservableObject {
  @Published var color: UIColor = .black
  @Published var modifiers: [[String: Any]] = []
}
