import ExpoModulesCore
import SwiftUI

public class HStackModule: Module {
  public func definition() -> ModuleDefinition {
    Name("HStack")
    View(HStackExpoView.self) {
      // Prop("label") { (view: HStackExpoView, prop: String?) in
      //   view.props.label = prop ?? ""
      // }
    }
  }
}
