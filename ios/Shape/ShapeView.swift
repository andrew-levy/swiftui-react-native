import SwiftUI

struct ShapeView: View {
  @ObservedObject var props: ShapeProps
  var body: some View {
    switch props.type {
    case "Circle":
      Circle()
        .fill(.blue)
        .reactNativeViewModifiers(mods: props.modifiers)
    case "Rectangle":
      Rectangle()
        .fill(.blue)
        .reactNativeViewModifiers(mods: props.modifiers)
    case "Capsule":
      Capsule()
        .fill(.blue)
        .reactNativeViewModifiers(mods: props.modifiers)
    case "RoundedRectangle":
      RoundedRectangle(cornerRadius: props.cornerRadius)
        .fill(.blue)
        .reactNativeViewModifiers(mods: props.modifiers)
      
    default:
      EmptyView()
    }
  }
}
