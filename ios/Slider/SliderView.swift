import SwiftUI

struct SliderView: View {
  @ObservedObject var props: SliderProps
  @State var value = 0.0

  var body: some View {
    if #available(iOS 14.0, *) {
      if let step = props.step {
        Slider(value: $value, in: ClosedRange(uncheckedBounds: (props.range[0], props.range[1])), step: step)
          .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
          .onAppear {
            value = props.value
          }
          .onChange(of: value) { newValue in
            props.onEvent([
              "onValueChange": newValue
            ])
          }
      } else {
        Slider(value: $value, in: ClosedRange(uncheckedBounds: (props.range[0], props.range[1])))
          .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
          .onAppear {
            value = props.value
          }
          .onChange(of: value) { newValue in
            props.onEvent([
              "onValueChange": newValue
            ])
          }
      }
    }
  }
}
