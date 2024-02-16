import ExpoModulesCore

public class ButtonModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Button")
    View(ButtonExpoView.self) {
      Events("onAction")
      Prop("text") { (view: ButtonExpoView, prop: String) in
        view.props.text = prop
      }
      Prop("modifiers") { (view: ButtonExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
