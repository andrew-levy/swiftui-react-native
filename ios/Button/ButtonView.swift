import SwiftUI

struct ButtonView: View {
  @ObservedObject var props: ButtonProps
  var body: some View {
    
    if let title = props.title {
      if #available(iOS 15.0, *) {
        Button(title, role: props.role.toRoleEnum()) {
          props.onEvent(["onAction": true])
        }
        .reactNativeViewModifiers(mods: props.modifiers)
      } else {
        Button(title) {
          props.onEvent(["onAction": true])
        }
        .reactNativeViewModifiers(mods: props.modifiers)
      }
    } else {
      if #available(iOS 15.0, *) {
        Button(role: props.role.toRoleEnum()) {
          props.onEvent(["onAction": true])
        } label: {
          ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
            RepresentableView(view: props.children?[index] ?? UIView())
          }
        }
        .reactNativeViewModifiers(mods: props.modifiers)
      } else {
        Button {
          props.onEvent(["onAction": true])
        } label: {
          ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
            RepresentableView(view: props.children?[index] ?? UIView())
          }
        }
        .reactNativeViewModifiers(mods: props.modifiers)
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
