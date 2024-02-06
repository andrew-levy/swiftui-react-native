
import SwiftUI
import ExpoModulesCore

extension View {
  func sizedToFit(onSized: EventDispatcher) -> some View {
    modifier(SizedToFit(onSized: onSized))
  }
  func pickerType(type: String) -> some View {
    modifier(PickerType(type: type))
  }
  func conditionalLabel(hasLabel: Bool) -> some View {
    modifier(ConditionalLabel(hasLabel: hasLabel))
  }
  func conditionalTint(color: UIColor?) -> some View {
    modifier(ConditionalTint(color: color))
  }
  func reactModifiers(mods: [[String: Any]]) -> some View {
    modifier(RNModifiers(mods: mods))
  }
}



struct SizedToFit: ViewModifier {
  var onSized: EventDispatcher
  func body(content: Content) -> some View {
    if #available(iOS 15.0, *) {
      content
        .background() {
          GeometryReader { geometry in
            Path { path in
              let size = geometry.size
              DispatchQueue.main.async {
                onSized(["value" : [
                  "width": size.width,
                  "height": size.height
                ]])
              }
            }
          }
        }
    }
  }
}

struct PickerType: ViewModifier {
  var type: String
  func body(content: Content) -> some View {
    switch(type) {
    case "wheel":
      return AnyView(content.pickerStyle(.wheel))
    case "segmented":
      return AnyView(content.pickerStyle(.segmented))
    case "menu":
      if #available(iOS 14.0, *) {
        return AnyView(content.pickerStyle(.menu))
      } else {
        return AnyView(content.pickerStyle(.segmented))
      }
    default:
      return AnyView(content.pickerStyle(.segmented))
    }
  }
}

struct ConditionalLabel: ViewModifier {
  let hasLabel: Bool
  func body(content: Content) -> some View {
    if hasLabel {
      return AnyView(content)
    } else {
      return AnyView(content.labelsHidden())
    }
  }
}

struct ConditionalTint: ViewModifier {
  let color: UIColor?
  func body(content: Content) -> some View {
    if let color = color {
      if #available(iOS 16.0, *) {
        content.tint(Color(color))
      } else {
        content.accentColor(Color(color))
      }
    } else {
      content
    }
  }
}


 struct RNModifiers: ViewModifier {
   var mods: [[String: Any]]
   func body(content: Content) -> some View {
     var view = AnyView(content)
     for mod in mods {
       for (key, value) in mod {
         switch(key) {
         case "padding":
           if let padding = value as? CGFloat {
             view = AnyView(view.padding(padding))
           } else if let padding = value as? [String: CGFloat] {
             view = AnyView(view.padding(.init(
              top: padding["top"] ?? 0,
              leading: padding["leading"] ?? 0,
              bottom: padding["bottom"] ?? 0,
              trailing: padding["trailing"] ?? 0
             )))
           }
         case "border":
           if let border = value as? [String: Any] {
             if let color = border["color"] as? String, let width = border["width"] as? CGFloat {
               view = AnyView(view.border(.black, width: width))
             }
           }
         case "foregroundStyle":
           if let color = value as? UIColor {
             if #available(iOS 15.0, *) {
               view = AnyView(view.foregroundStyle(Color(color)))
             } else {
               
             }
           } else if let color = value as? [UIColor] {
             if #available(iOS 15.0, *) {
               
             } else {
               
             }
           }
         case "background":
           if let color = value as? String {
             print("adding color \(color)")
             view = AnyView(view.background(Color.red))
           }
         case "rotationEffect":
           if let rotation = value as? [String: CGFloat] {
             if let degrees = rotation["degrees"] {
               view = AnyView(view.rotationEffect(.degrees(Double(degrees))))
             } else if let radians = rotation["radians"] {
               view = AnyView(view.rotationEffect(.radians(Double(radians))))
             }
           }
         case "scaleEffect":
           if let scale = value as? CGFloat {
             view = AnyView(view.scaleEffect(scale))
           }
         case "shadow":
           if let shadow = value as? [String: Any] {
             if let color = shadow["color"] as? UIColor, let radius = shadow["radius"] as? CGFloat, let x = shadow["x"] as? CGFloat, let y = shadow["y"] as? CGFloat {
               view = AnyView(view.shadow(color: Color(color), radius: radius, x: x, y: y))
             }
           }
         case "opacity":
           if let opacity = value as? CGFloat {
             view = AnyView(view.opacity(opacity))
           }
         case "frame":
           if let frame = value as? [String: Any] {
             if let width = frame["width"] as? CGFloat, let height = frame["height"] as? CGFloat {
               view = AnyView(view.frame(width: width, height: height))
             }
           }
         case "zIndex":
           if let zIndex = value as? Int {
             view = AnyView(view.zIndex(Double(zIndex)))
           }
         case "preferredColorScheme":
           if let scheme = value as? String {
             if scheme == "light" {
               view = AnyView(view.preferredColorScheme(.light))
             } else if scheme == "dark" {
               view = AnyView(view.preferredColorScheme(.dark))
             }
           }
         case "fontWeight":
           if let fontWeight = value as? String {
             
           }
         case "font":
           if let font = value as? String {
             
             
           }
         case "bold":
           if let bold = value as? Bool {
             if bold {
               if #available(iOS 16.0, *) {
                 view = AnyView(view.bold())
               } else {
                 
               }
             }
           }
         case "italic":
           if let italic = value as? Bool {
             if italic {
               if #available(iOS 16.0, *) {
                 view = AnyView(view.italic())
               } else {
                 // Fallback on earlier versions
               }
             }
           }
         case "strikethrough":
           if let strikethrough = value as? Bool {
             if strikethrough {
               if #available(iOS 16.0, *) {
                 view = AnyView(view.strikethrough(true))
               } else {
                 // Fallback on earlier versions
               }
             }
           }
         case "underline":
           if let underline = value as? Bool {
             if underline {
               if #available(iOS 16.0, *) {
                 view = AnyView(view.underline(true))
               } else {
                 // Fallback on earlier versions
               }
             }
           }
         default:
           break
         }
       }
     }
     return AnyView(view)
   }
 }


func convertRGBAToHexString(red: CGFloat, green: CGFloat, blue: CGFloat, alpha: CGFloat) -> String {
  let redInt = Int(red * 255)
  let greenInt = Int(green * 255)
  let blueInt = Int(blue * 255)
  let alphaInt = Int(alpha * 255)
  return String(format: "#%02X%02X%02X%02X", redInt, greenInt, blueInt, alphaInt)
}