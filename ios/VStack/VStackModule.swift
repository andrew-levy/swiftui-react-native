import ExpoModulesCore
import SwiftUI

public class VStackModule: Module {
  public func definition() -> ModuleDefinition {
    Name("VStack")
    View(VStackExpoView.self) {
      Prop("modifiers") { (view: VStackExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
