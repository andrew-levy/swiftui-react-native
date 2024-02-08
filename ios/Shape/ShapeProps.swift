import SwiftUI
import ExpoModulesCore

class ShapeProps: ObservableObject {
  @Published var type: String = ""
  @Published var cornerRadius: Double = 0.0
  @Published var modifiers: [[String: Any]] = []
}
