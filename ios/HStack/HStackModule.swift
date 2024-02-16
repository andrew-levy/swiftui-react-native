import ExpoModulesCore
import SwiftUI

public class HStackModule: Module {
  public func definition() -> ModuleDefinition {
    Name("HStack")
    View(HStackExpoView.self) {
      Prop("modifiers") { (view: HStackExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
