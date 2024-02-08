import ExpoModulesCore

public class PickerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Picker")
    View(PickerExpoView.self) {
      Events("onSized")
      Events("onValueChange")
      Prop("options") { (view: PickerExpoView, prop: [String]) in
        view.props.options = prop
      }
      Prop("selection") { (view: PickerExpoView, prop: String) in
        view.props.selection = prop
      }
      Prop("modifiers") { (view: PickerExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
