import ExpoModulesCore

public class ButtonModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Button")
    View(ButtonExpoView.self) {
      Events("onEvent")
      Prop("title") { (view: ButtonExpoView, prop: String) in
        view.props.title = prop
      }
      Prop("modifiers") { (view: ButtonExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
