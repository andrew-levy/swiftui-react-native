import SwiftUI
import ExpoModulesCore

struct DatePickerView: View {
  @ObservedObject var props: DatePickerProps
  @State var date = Date()
  
  init(props: DatePickerProps) {
    self.props = props
    _date.wrappedValue = ISO8601DateFormatter().date(from: props.selection) ?? Date()
  }

  var body: some View {
    if #available(iOS 14.0, *) {
      DatePicker(props.label, selection: $date, displayedComponents: mapDisplayedComponents(props.displayedComponents))
        .reactNativeViewModifiers(mods: props.modifiers)
        .conditionalLabel(hasLabel: !props.label.isEmpty)
        .onChange(of: date) { newValue in
          print("newval \(newValue)")
          if #available(iOS 15.0, *) {
            props.onValueChange([
              "value": newValue.ISO8601Format()
            ])
          }
        }
    }
  }
}

func mapDisplayedComponents(_ components: [String]) -> DatePickerComponents {
  var result: DatePickerComponents = []
  for component in components {
    switch component {
      case "date":
        result.insert(.date)
      case "hourAndMinute":
        result.insert(.hourAndMinute)
      default:
        result.insert(.date)
    }
  }
  return result
}
