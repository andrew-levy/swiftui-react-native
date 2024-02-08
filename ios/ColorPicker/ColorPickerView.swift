import SwiftUI
import ExpoModulesCore

struct ColorPickerView: View {
  @ObservedObject var props: ColorPickerProps
  private var colorBinding: Binding<Color> {
    Binding<Color>(
      get: { Color(self.props.selection) },
      set: { newColor in
        if #available(iOS 14.0, *) {
          self.props.selection = UIColor(newColor)
        }
      }
    )
  }
  
  var body: some View {
    if #available(iOS 14.0, *) {
      ColorPicker(props.label, selection: colorBinding, supportsOpacity: props.supportsOpacity)
        .reactNativeViewModifiers(mods: props.modifiers)
        .conditionalLabel(hasLabel: !props.label.isEmpty)
        .onAppear {
          colorBinding.wrappedValue = Color(props.selection)
        }
        .onChange(of: props.selection) { newValue in
          var red: CGFloat = 0
          var green: CGFloat = 0
          var blue: CGFloat = 0
          var alpha: CGFloat = 0
          newValue.getRed(&red, green: &green, blue: &blue, alpha: &alpha)
          props.onValueChange([
            "value": convertRGBAToHexString(red: red, green: green, blue: blue, alpha: alpha)
          ])
        }
    }
  }
}
