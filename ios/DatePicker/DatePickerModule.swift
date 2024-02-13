import ExpoModulesCore
import SwiftUI

public class DatePickerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("DatePicker")
    View(DatePickerExpoView.self) {
      Events("onValueChange")
      Prop("label") { (view: DatePickerExpoView, prop: String?) in
        view.props.label = prop ?? ""
      }
      Prop("displayedComponents") { (view: DatePickerExpoView, prop: [String]) in
        view.props.displayedComponents = prop
      }
      Prop("selection") { (view: DatePickerExpoView, prop: String) in
        view.props.selection = prop
      }
      Prop("modifiers") { (view: DatePickerExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
