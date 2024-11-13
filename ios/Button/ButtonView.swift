import SwiftUI

struct ButtonView: View {
  @ObservedObject var props: ButtonProps
  var body: some View {
    
    if let title = props.title {
      // Content as title prop
      if #available(iOS 15.0, *) {
        if let systemImage = props.systemImage {
          // With systemImage
          Button(title, systemImage: systemImage, role: props.role.toRoleEnum()) {
            props.onEvent(["onAction": true])
          }
          .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
        } else {
          // No systemImage
          Button(title, role: props.role.toRoleEnum()) {
            props.onEvent(["onAction": true])
          }
          .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
        }
      } else {
        // Before ios 15
        Button(title) {
          props.onEvent(["onAction": true])
        }
        .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
      }
    } else {
      // Content as children
      if #available(iOS 15.0, *) {
        Button(role: props.role.toRoleEnum()) {
          props.onEvent(["onAction": true])
        } label: {
          ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
            RepresentableView(view: props.children?[index] ?? UIView())
          }
        }
        .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
      } else {
        Button {
          props.onEvent(["onAction": true])
        } label: {
          ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
            RepresentableView(view: props.children?[index] ?? UIView())
          }
        }
        .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
      }
    }
  }
}


extension String? {
  @available(iOS 15.0, *)
  func toRoleEnum() -> ButtonRole? {
    switch self {
    case "destructive": return .destructive
    case "cancel": return .cancel
    default: return nil
    }
  }
}
