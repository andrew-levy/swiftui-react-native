import ExpoModulesCore
import SwiftUI

public class ListModule: Module {
  public func definition() -> ModuleDefinition {
    Name("List")
    View(ListExpoView.self) {
      // Prop("label") { (view: ListExpoView, prop: String?) in
      //   view.props.label = prop ?? ""
      // }
    }
  }
}
