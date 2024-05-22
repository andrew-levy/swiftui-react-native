import ExpoModulesCore

public class MenuModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Menu")
    View(MenuExpoView.self) {
      Events("onEvent")
      Prop("actions") { (view: MenuExpoView, prop: [[String: Any]]) in
        view.props.actions = prop
      }
      Prop("modifiers") { (view: MenuExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
