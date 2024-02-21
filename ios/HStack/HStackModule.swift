import ExpoModulesCore
import SwiftUI

public class HStackModule: Module {
  public func definition() -> ModuleDefinition {
    Name("HStack")
    View(HStackExpoView.self) {
      Events("onAppear", "onDisappear", "onSheetDismissed")
      Prop("modifiers") { (view: HStackExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
      Prop("isSheetPresented") { (view: HStackExpoView, prop: Bool) in
        view.props.isSheetPresented = prop
      }
    }
  }
}
