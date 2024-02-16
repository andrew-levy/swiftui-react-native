import ExpoModulesCore
import SwiftUI

public class GroupModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Group")
    View(GroupExpoView.self) {
      Prop("modifiers") { (view: GroupExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
