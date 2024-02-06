import ExpoModulesCore
import SwiftUI

public class ColorPickerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ColorPicker")
    View(ColorPickerExpoView.self) {
      Events("onValueChange")
      Prop("label") { (view: ColorPickerExpoView, prop: String?) in
        view.props.label = prop ?? ""
      }
      Prop("selection") { (view: ColorPickerExpoView, prop: UIColor) in
        view.props.selection = prop
      }
      Prop("modifiers") { (view: ColorPickerExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
