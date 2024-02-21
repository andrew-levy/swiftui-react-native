import SwiftUI

struct ShapeView: View {
  @ObservedObject var props: ShapeProps

  func getFill() -> Color {
    for mod in props.modifiers {
      for (key, value) in mod {
        if key == "fill" {
          return Color(getColor(value))
        }
      }
    }
    return Color.black
  }

  func getStroke() -> (Color, CGFloat) {
    for mod in props.modifiers {
      for (key, value) in mod {
        if key == "stroke" {
          if let val = value as? [String: Any] {
            if let color = getColor(val["color"]) as? UIColor, let width = val["lineWidth"] as? CGFloat {
              return (Color(color), width)
            }
          } else if let color = getColor(value) as? UIColor {
            return (Color(color), 1)
          }
        }
      }
    }
    return (Color.clear, 0)
  }

  var body: some View {
    
    switch props.type {
    case "Circle":
      Circle()
        .strokeAndFill(stroke: getStroke(), fill: getFill())
        .reactNativeViewModifiers(mods: props.modifiers)
    case "Rectangle":
      Rectangle()
        .strokeAndFill(stroke: getStroke(), fill: getFill())
        .reactNativeViewModifiers(mods: props.modifiers)
    case "Capsule":
      Capsule()
        .strokeAndFill(stroke: getStroke(), fill: getFill())
        .reactNativeViewModifiers(mods: props.modifiers)
    case "RoundedRectangle":
      RoundedRectangle(cornerRadius: props.cornerRadius)
        .strokeAndFill(stroke: getStroke(), fill: getFill())
        .reactNativeViewModifiers(mods: props.modifiers)
      
    case "Ellipse":
      Ellipse()
        .strokeAndFill(stroke: getStroke(), fill: getFill())
        .reactNativeViewModifiers(mods: props.modifiers)
      
    default:
      EmptyView()
    }
  }
}


extension Shape {
    func strokeAndFill(
      stroke: (Color, CGFloat),
      fill: Color
    ) -> some View {
      if #available(iOS 17.0, *) {
        return self
          .stroke(stroke.0, lineWidth: stroke.1)
          .fill(fill)
      } else {
        return self
      }
    }
}
