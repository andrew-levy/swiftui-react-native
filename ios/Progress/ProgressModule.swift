import ExpoModulesCore

public class ProgressModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Progress")
    View(ProgressExpoView.self) {
      Events("onSized")
      Prop("value") { (view: ProgressExpoView, prop: Double?) in
        view.props.value = prop
      }
      Prop("total") { (view: ProgressExpoView, prop: Double?) in
        view.props.total = prop ?? 1
      }
      Prop("label") { (view: ProgressExpoView, prop: String?) in
        view.props.label = prop ?? ""
      }
      Prop("currentValueLabel") { (view: ProgressExpoView, prop: String?) in
        view.props.currentValueLabel = prop ?? ""
      }
      Prop("modifiers") { (view: ProgressExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
