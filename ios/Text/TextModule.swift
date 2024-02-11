import ExpoModulesCore

public class TextModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Text")
    View(TextExpoView.self) {
      Events("onSized")
      Prop("text") { (view: TextExpoView, prop: String) in
        view.props.text = prop
      }
      Prop("modifiers") { (view: TextExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
