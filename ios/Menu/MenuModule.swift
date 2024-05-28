import ExpoModulesCore

public class MenuModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Menu")
    View(MenuExpoView.self) {
      Events("onEvent")
      Prop("title") { (view: MenuExpoView, prop: String?) in
        view.props.title = prop ?? ""
      }
      Prop("systemImage") { (view: MenuExpoView, prop: String?) in
        view.props.systemImage = prop
      }
      Prop("hasPrimaryAction") { (view: MenuExpoView, prop: Bool) in
        view.props.hasPrimaryAction = prop
      }
      Prop("actions") { (view: MenuExpoView, prop: [[String: Any]]) in
        view.props.actions = prop
      }
      Prop("modifiers") { (view: MenuExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
