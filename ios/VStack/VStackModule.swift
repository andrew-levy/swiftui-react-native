import ExpoModulesCore
import SwiftUI

public class VStackModule: Module {
  public func definition() -> ModuleDefinition {
    Name("VStack")
    View(VStackExpoView.self) {
      // Prop("label") { (view: VStackExpoView, prop: String?) in
      //   view.props.label = prop ?? ""
      // }
    }
  }
}
