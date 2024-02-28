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
      Prop("header") { (view: ListExpoView, prop: String) in
        view.props.header = prop
      }
      Prop("footer") { (view: ListExpoView, prop: String) in
        view.props.footer = prop
      }
    }
  }
}
