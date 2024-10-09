import ExpoModulesCore

public class SwiftUIImageModule: Module {
  public func definition() -> ModuleDefinition {
    Name("SwiftUIImage")
    View(ImageExpoView.self) {
      Events("onEvent")
      Prop("systemName") { (view: ImageExpoView, prop: String) in
        view.props.systemName = prop
      }
      Prop("variableValue") { (view: ImageExpoView, variableValue: Double?) in
        view.props.variableValue = variableValue ?? 1.0
      }
      Prop("modifiers") { (view: ImageExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
