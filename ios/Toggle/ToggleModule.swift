import ExpoModulesCore

public class ToggleModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Toggle")
    View(ToggleExpoView.self) {
      Events("onValueChange")
      Prop("isOn") { (view: ToggleExpoView, prop: Bool) in
        view.props.isOn = prop
      }
      Prop("label") { (view: ToggleExpoView, prop: String?) in
        view.props.label = prop
      }
      Prop("modifiers") { (view: ToggleExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
