import ExpoModulesCore
import SwiftUI

public class ZStackModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ZStack")
    View(ZStackExpoView.self) {
      Prop("modifiers") { (view: ZStackExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
