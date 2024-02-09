import SwiftUI
import ExpoModulesCore

class LabelProps: ObservableObject {
  @Published var systemImage: String = ""
  @Published var title: String = ""
  @Published var modifiers: [[String: Any]] = []
}
