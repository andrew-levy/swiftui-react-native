import ExpoModulesCore

public class TextFieldModule: Module {
  public func definition() -> ModuleDefinition {
    Name("TextField")
    View(TextFieldExpoView.self) {
      Events("onEvent")
      Prop("text") { (view: TextFieldExpoView, prop: String) in
        view.props.text = prop
      }
      Prop("placeholder") { (view: TextFieldExpoView, prop: String) in
        view.props.placeholder = prop
      }
      Prop("type") { (view: TextFieldExpoView, prop: String) in
        view.props.type = prop
      }
      Prop("modifiers") { (view: TextFieldExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
