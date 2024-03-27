import ExpoModulesCore
import SwiftUI

public class SheetContentModule: Module {
  public func definition() -> ModuleDefinition {
    Name("SheetContent")
    View(SheetContentExpoView.self) { }
  }
}
