import ExpoModulesCore
import SwiftUI

public class ColorPickerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ColorPicker")
    View(ColorPickerExpoView.self) {
      Events("onEvent")
      Prop("title") { (view: ColorPickerExpoView, prop: String?) in
        view.props.title = prop ?? ""
      }
      Prop("selection") { (view: ColorPickerExpoView, prop: UIColor) in
        view.props.selection = prop
      }
      Prop("modifiers") { (view: ColorPickerExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
      Prop("supportsOpacity") { (view: ColorPickerExpoView, prop: Bool) in
        view.props.supportsOpacity = prop
      }
    }
  }
}
