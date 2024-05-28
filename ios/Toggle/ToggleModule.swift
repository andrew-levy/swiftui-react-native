import ExpoModulesCore

public class ToggleModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Toggle")
    View(ToggleExpoView.self) {
      Events("onEvent")
      Prop("isOn") { (view: ToggleExpoView, prop: Bool) in
        view.props.isOn = prop
      }
      Prop("title") { (view: ToggleExpoView, prop: String?) in
        view.props.title = prop
      }
      Prop("modifiers") { (view: ToggleExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
