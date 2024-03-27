import ExpoModulesCore
import SwiftUI

public class ColorModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Color")
    Function("getColor") { (color: String) -> String in
      let uiColor: UIColor
      if #available(iOS 14.0, *) {
        uiColor = UIColor(getColor(color))
      } else {
        uiColor = .clear
      }
      var red: CGFloat = 0
      var green: CGFloat = 0
      var blue: CGFloat = 0
      var alpha: CGFloat = 0
      uiColor.getRed(&red, green: &green, blue: &blue, alpha: &alpha)
      return convertRGBAToHexString(red: red, green: green, blue: blue, alpha: alpha)
    }
    View(ColorExpoView.self) {
      Events("onEvent")
      Prop("color") { (view: ColorExpoView, prop: String) in
        view.props.color = prop
      }
      Prop("modifiers") { (view: ColorExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
