import ExpoModulesCore
import SwiftUI

public class ListModule: Module {
  public func definition() -> ModuleDefinition {
    Name("List")
    View(ListExpoView.self) {
      Events("onEvent")
      Prop("modifiers") { (view: ListExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
