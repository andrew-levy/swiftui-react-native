import ExpoModulesCore
import SwiftUI

public class VStackModule: Module {
  public func definition() -> ModuleDefinition {
    Name("VStack")
    View(VStackExpoView.self) {
      Events("onEvent")
      Prop("alignment") { (view: VStackExpoView, prop: String?) in
        switch prop {
        case "leading" : view.props.alignment = .leading
        case "center" : view.props.alignment = .center
        case "trailing" : view.props.alignment = .trailing
        default: view.props.alignment = .center
        }
      }
      Prop("spacing") { (view: VStackExpoView, prop: Float?) in
        view.props.spacing = prop
      }
      Prop("modifiers") { (view: VStackExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
