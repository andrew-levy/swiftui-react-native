import ExpoModulesCore
import SwiftUI

public class DividerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Divider")
    View(DividerExpoView.self) {
      Events("onEvent")
      Prop("modifiers") { (view: DividerExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
