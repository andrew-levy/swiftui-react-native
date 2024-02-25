import ExpoModulesCore
import SwiftUI

public class HStackModule: Module {
  public func definition() -> ModuleDefinition {
    Name("HStack")
    View(HStackExpoView.self) {
      Events("onEvent")
      Prop("alignment") { (view: HStackExpoView, prop: String?) in
        switch prop {
        case "top" : view.props.alignment = .top
        case "center" : view.props.alignment = .center
        case "bottom" : view.props.alignment = .bottom
        default: view.props.alignment = .center
        }
      }
      Prop("spacing") { (view: HStackExpoView, prop: Float?) in
        view.props.spacing = prop
      }
      Prop("modifiers") { (view: HStackExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
