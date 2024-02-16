import ExpoModulesCore
import SwiftUI

public class SpacerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Spacer")
    View(SpacerExpoView.self) {
      Prop("modifiers") { (view: SpacerExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
