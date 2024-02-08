import SwiftUI
import ExpoModulesCore

class ImageProps: ObservableObject {
  @Published var systemName: String = ""
  @Published var modifiers: [[String: Any]] = []
}
