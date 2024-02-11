import ExpoModulesCore

public class ColorModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Color")
    Function("getUIColor") { (color: String) in

    }
    View(ColorExpoView.self) {
      Prop("color") { (view: ColorExpoView, prop: UIColor) in
        view.props.color = prop
      }
      Prop("modifiers") { (view: ColorExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
