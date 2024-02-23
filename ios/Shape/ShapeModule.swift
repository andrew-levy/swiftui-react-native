import ExpoModulesCore

public class ShapeModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Shape")
    View(ShapeExpoView.self) {
      Prop("modifiers") { (view: ShapeExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
      Prop("type") { (view: ShapeExpoView, prop: String) in
        view.props.type = prop
      }
      Prop("cornerRadius") { (view: ShapeExpoView, prop: Double) in
        view.props.cornerRadius = prop
      }
      Prop("cornerRadii") { (view: ShapeExpoView, prop: [String: Double]) in
        view.props.cornerRadii = prop
      }
    }
  }
}
