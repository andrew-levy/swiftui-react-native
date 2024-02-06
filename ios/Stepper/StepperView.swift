import SwiftUI

struct StepperView: View {
  @ObservedObject var props: StepperProps
  var body: some View {
    if #available(iOS 16.0, *) {
      Stepper(props.labelText ?? "", value: $props.value, in: ClosedRange(uncheckedBounds: (props.range[0], props.range[1])), step: props.step)
        .reactModifiers(mods: props.modifiers)
        .conditionalLabel(hasLabel: props.labelText != nil)
        .onChange(of: props.value) { newValue in
          props.onValueChange([
            "value": newValue
          ])
        }
    }
  }
}
