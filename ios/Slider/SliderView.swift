import SwiftUI

struct SliderView: View {
  @ObservedObject var props: SliderProps

  var body: some View {
    if #available(iOS 17.0, *) {
      Slider(value: $props.value, in: ClosedRange(uncheckedBounds: (props.range[0], props.range[1])), step: props.step, label: {
        Text(props.labelText ?? "")
      }, minimumValueLabel: {
        Text(props.labelText ?? "")
      }, maximumValueLabel: {
        Text(props.labelText ?? "")
      }, onEditingChanged: { state in
        print("edit changed \(state ? "start" : "end")")
        props.onValueChange([
          "value": props.value
        ])
      })
        .reactNativeViewModifiers(mods: props.modifiers)
        .conditionalLabel(hasLabel: props.labelText != nil)
        .onChange(of: props.value) { (oldValue, newValue) in
          // only post a change if the new value - old value is greater than the step
//          if abs(newValue - oldValue) >= props.step {
//            props.onValueChange([
//              "value": newValue
//            ])
//          }
//          props.onValueChange([
//            "value": newValue
//          ])
         
        }
    }
  }
}
