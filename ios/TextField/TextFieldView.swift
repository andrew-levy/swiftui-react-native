import SwiftUI

struct TextFieldView: View {
  @ObservedObject var props: TextFieldProps
  var body: some View {
    if #available(iOS 14.0, *)  {
      switch props.type {
      case "textfield":
        TextField(props.placeholder, text: $props.text)
          .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
          .onChange(of: props.text) { newValue in
            props.onEvent([
              "onValueChange": newValue
            ])
          }
      case "securefield":
        SecureField(props.placeholder, text: $props.text)
          .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
          .onChange(of: props.text) { newValue in
            props.onEvent([
              "onValueChange": newValue
            ])
          }
      case "texteditor":
        TextEditor(text: $props.text)
          .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
          .onChange(of: props.text) { newValue in
            props.onEvent([
              "onValueChange": newValue
            ])
          }
      default:
        TextField(props.placeholder, text: $props.text)
          .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
          .onChange(of: props.text) { newValue in
            props.onEvent([
              "onValueChange": newValue
            ])
          }
      }
    }
  }
}
