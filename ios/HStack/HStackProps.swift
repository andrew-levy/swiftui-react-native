import SwiftUI
import ExpoModulesCore

class HStackProps: ObservableObject {
  @Published var children: [UIView]?
  @Published var sheetContent: UIView?
  @Published var isSheetPresented: Bool = false
  @Published var modifiers: [[String: Any]] = []
  @Published var onAppear: EventDispatcher
  @Published var onDisappear: EventDispatcher
  @Published var onSheetDismissed: EventDispatcher
  init(onAppear: EventDispatcher, onDisappear: EventDispatcher, onSheetDismissed: EventDispatcher) {
    self.onAppear = onAppear
    self.onDisappear = onDisappear
    self.onSheetDismissed = onSheetDismissed
  }
}
