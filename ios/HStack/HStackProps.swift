import SwiftUI
import ExpoModulesCore

class HStackProps: ObservableObject {
  @Published var children: [UIView]?
  @Published var sheetContent: UIView?
  @Published var isSheetPresented: Bool = false
  @Published var modifiers: [[String: Any]] = []
  @Published var onSheetDismissed: EventDispatcher
  init(onSheetDismissed: EventDispatcher) {
    self.onSheetDismissed = onSheetDismissed
  }
}
