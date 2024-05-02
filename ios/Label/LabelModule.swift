import ExpoModulesCore

public class LabelModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Label")
    View(LabelExpoView.self) {
      Events("onEvent")
      Prop("systemImage") { (view: LabelExpoView, prop: String) in
        view.props.systemImage = prop
      }
      Prop("title") { (view: LabelExpoView, prop: String) in
        view.props.title = prop
      }
      Prop("modifiers") { (view: LabelExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
