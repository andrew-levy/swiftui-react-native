
import SwiftUI
import ExpoModulesCore

extension View {
  func sizedToFit(onSized: EventDispatcher) -> some View {
    modifier(SizedToFit(onSized: onSized))
  }
  func conditionalLabel(hasLabel: Bool) -> some View {
    modifier(ConditionalLabel(hasLabel: hasLabel))
  }
  func reactNativeViewModifiers(mods: [[String: Any]]) -> some View {
    modifier(ReactNativeViewModifiers(mods: mods))
  }
}


struct SizedToFit: ViewModifier {
  var onSized: EventDispatcher
  func body(content: Content) -> some View {
    if #available(iOS 15.0, *) {
      content
        .background {
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


 struct ReactNativeViewModifiers: ViewModifier {
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
             if let color = getColor(border["color"]) as UIColor?, let width = border["width"] as? CGFloat {
               view = AnyView(view.border(Color(color), width: width))
             }
           }
         case "foregroundStyle":
           print(value)
           if let color = getColor(value) as UIColor? {
             if #available(iOS 15.0, *) {
               view = AnyView(view.foregroundStyle(Color(color)))
             } else {
               
             }
           } else if let color = value as? [UIColor] {
             switch color.count {
             case 1:
               if #available(iOS 15.0, *) {
                 view = AnyView(view.foregroundStyle(Color(color[0])))
               }
             case 2:
               if #available(iOS 15.0, *) {
                 view = AnyView(view.foregroundStyle(Color(color[0]), Color(color[1])))
               }
             case 3:
               if #available(iOS 15.0, *) {
                 view = AnyView(view.foregroundStyle(Color(color[0]), Color(color[1]), Color(color[2])))
               }
             default:
               break
             }
           }
           
         case "background":
           if let color = getColor(value) as UIColor? {
             view = AnyView(view.background(Color(color)))
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
             if let color = getColor(value) as UIColor?, let radius = shadow["radius"] as? CGFloat, let x = shadow["x"] as? CGFloat, let y = shadow["y"] as? CGFloat {
               view = AnyView(view.shadow(color: Color(color), radius: radius, x: x, y: y))
             }
           }
         case "opacity":
           if let opacity = value as? CGFloat {
             view = AnyView(view.opacity(opacity))
           }
          case "blur": 
            if let blur = value as? CGFloat {
              view = AnyView(view.blur(radius: blur))
            }
         case "saturation":
           if let sat = value as? Double {
             view = AnyView(view.saturation(sat))
           }
         case "grayscale":
           if let gs = value as? Double {
             view = AnyView(view.grayscale(gs))
           }
         case "brigtness":
           if let brightness = value as? Double {
             view = AnyView(view.brightness(brightness))
           }
          case "contrast": 
           if let contrast = value as? Double {
             view = AnyView(view.contrast(contrast))
           }
           case "hidden": 
              if let hidden = value as? Bool {
                if hidden == true {
                  view = AnyView(view.hidden())
                }
              }
         case "blendMode":
           if let blendMode = value as? String {
             switch blendMode {
             case "color":
               view = AnyView(view.blendMode(.color))
             case "colorBurn":
               view = AnyView(view.blendMode(.colorBurn))
             case "colorDodge":
               view = AnyView(view.blendMode(.colorDodge))
             case "darken":
               view = AnyView(view.blendMode(.darken))
             case "difference":
               view = AnyView(view.blendMode(.difference))
             case "exclusion":
               view = AnyView(view.blendMode(.exclusion))
             case "hardLight":
               view = AnyView(view.blendMode(.hardLight))
             case "hue":
               view = AnyView(view.blendMode(.hue))
             case "lighten":
               view = AnyView(view.blendMode(.lighten))
             case "luminosity":
               view = AnyView(view.blendMode(.luminosity))
             case "multiply":
               view = AnyView(view.blendMode(.multiply))
             case "overlay":
               view = AnyView(view.blendMode(.overlay))
             case "saturation":
               view = AnyView(view.blendMode(.saturation))
             case "screen":
               view = AnyView(view.blendMode(.screen))
             case "softLight":
               view = AnyView(view.blendMode(.softLight))
             case "sourceAtop":
               view = AnyView(view.blendMode(.sourceAtop))
             case "destinationOver":
               view = AnyView(view.blendMode(.destinationOver))
             case "destinationOut":
               view = AnyView(view.blendMode(.destinationOut))
             case "plusDarker":
               view = AnyView(view.blendMode(.plusDarker))
             case "plusLighter":
               view = AnyView(view.blendMode(.plusLighter))
             case "normal":
               view = AnyView(view.blendMode(.normal))
             default:
               break
             }
           }
         case "frame":
           if let frame = value as? [String: Any] {
             if let width = frame["width"] as? CGFloat, let height = frame["height"] as? CGFloat {
               view = AnyView(view.frame(width: width, height: height))
             }
           }
         case "zIndex":
           if let zIndex = value as? Double {
             view = AnyView(view.zIndex(zIndex))
           }
         case "mask":
           if let mask = value as? String {
             if #available(iOS 15.0, *) {
               view = AnyView(view.mask({
                 Text(mask)
               }))
             }
           }
         case "clipShape":
           if let clipShape = value as? String {
             switch clipShape {
             case "circle":
               view = AnyView(view.clipShape(Circle()))
             case "roundedRectangle":
               view = AnyView(view.clipShape(RoundedRectangle(cornerRadius: 10)))
             case "capsule":
               view = AnyView(view.clipShape(Capsule()))
             case "ellipse":
               view = AnyView(view.clipShape(Ellipse()))
             case "rectangle":
               view = AnyView(view.clipShape(Rectangle()))
             default:
               break
             }
           } else if let clipShape = value as? [String: Any] {
             if let shape = clipShape["shape"] as? String {
               switch shape {
               case "circle":
                 view = AnyView(view.clipShape(Circle()))
               case "roundedRectangle":
                 if let cornerRadius = clipShape["cornerRadius"] as? CGFloat {
                   view = AnyView(view.clipShape(RoundedRectangle(cornerRadius: cornerRadius)))
                 }
               case "capsule":
                 view = AnyView(view.clipShape(Capsule()))
               case "ellipse":
                 view = AnyView(view.clipShape(Ellipse()))
               case "rectangle":
                 view = AnyView(view.clipShape(Rectangle()))
               default:
                 break
               }
             }
           }
         case "environment":
           if let obj = value as? [String: Any] {
              for (key, value) in obj {
                switch key {
                case "colorScheme":
                  if let colorScheme = value as? String {
                    if #available(iOS 15.0, *) {
                      switch colorScheme {
                      case "light":
                        view = AnyView(view.environment(\.colorScheme, .light))
                      case "dark":
                        view = AnyView(view.environment(\.colorScheme, .dark))
                      default:
                        break
                      }
                    }
                  }
                default:
                  break
                }
              }
           }
           case "imageScale":
             if let scale = value as? String {
               switch scale {
                case "small":
                  view = AnyView(view.imageScale(.small))
                case "medium":
                  view = AnyView(view.imageScale(.medium))
                case "large":
                  view = AnyView(view.imageScale(.large))
                  default:
                    break
               }
             }
         case "fontWeight":
           if let fontWeight = value as? String {
             if #available(iOS 16.0, *)  {
               switch fontWeight {
               case "ultralight":
                 view = AnyView(view.fontWeight(.ultraLight))
               case "thin":
                 view = AnyView(view.fontWeight(.thin))
               case "light":
                 view = AnyView(view.fontWeight(.light))
               case "regular":
                 view = AnyView(view.fontWeight(.regular))
               case "medium":
                 view = AnyView(view.fontWeight(.medium))
               case "semibold":
                 view = AnyView(view.fontWeight(.semibold))
               case "bold":
                 view = AnyView(view.fontWeight(.bold))
               case "heavy":
                 view = AnyView(view.fontWeight(.heavy))
               case "black":
                 view = AnyView(view.fontWeight(.black))
               default:
                 break
               }
             }
           }
         case "font":
           if let font = value as? String {
             switch font {
              case "caption":
                view = AnyView(view.font(.caption))
              case "footnote":
                view = AnyView(view.font(.footnote))
              case "body":
                view = AnyView(view.font(.body))
              case "callout":
                view = AnyView(view.font(.callout))
              case "subheadline":
                view = AnyView(view.font(.subheadline))
              case "headline":
                view = AnyView(view.font(.headline))
              case "title":
                view = AnyView(view.font(.title))
              case "largeTitle":
                view = AnyView(view.font(.largeTitle))
              default:
                break
             }
           }
         case "bold":
           if let bold = value as? Bool {
             if bold == true, #available(iOS 16.0, *)  {
              view = AnyView(view.bold())
             }
           }
         case "italic":
           if let italic = value as? Bool {
              if italic == true, #available(iOS 16.0, *)  {
                view = AnyView(view.italic())
              }
           }
         case "strikethrough":
           if let strikethrough = value as? Bool {
              if strikethrough, #available(iOS 16.0, *) {
                view = AnyView(view.strikethrough(true))
              }
           }
         case "underline":
           if let underline = value as? Bool {
              if underline, #available(iOS 16.0, *) {
                view = AnyView(view.underline(true))
              }
           }
         case "tint":
           if let color = getColor(value) as UIColor? {
             if #available(iOS 16.0, *) {
               view = AnyView(view.tint(Color(color)))
             } else {
               view = AnyView(view.accentColor(Color(color)))
             }
           }

         case "cornerRadius":
            if let cornerRadius = value as? CGFloat {
              view = AnyView(view.cornerRadius(cornerRadius))
            }

         case "buttonStyle":
           if let buttonStyle = value as? String {
             switch buttonStyle {
             case "borderless":
               view = AnyView(view.buttonStyle(.borderless))
             case "bordered":
               if #available(iOS 15.0, *) {
                 view = AnyView(view.buttonStyle(.bordered))
               }
              case "borderedProminent":
                if #available(iOS 15.0, *) {
                  view = AnyView(view.buttonStyle(.borderedProminent))
                }
             case "plain":
               view = AnyView(view.buttonStyle(.plain))
             default:
               break
             }
           }

          case "pickerStyle":
            if let pickerStyle = value as? String {
              switch pickerStyle {
              case "wheel":
                if #available(iOS 14.0, *) {
                  view = AnyView(view.pickerStyle(.wheel))
                }
              case "segmented":
                if #available(iOS 14.0, *) {
                  view = AnyView(view.pickerStyle(.segmented))
                }
              case "menu":
                if #available(iOS 14.0, *) {
                  view = AnyView(view.pickerStyle(.menu))
                }
              default:
                break
              }
            }

          // case "symbolEffect":
          //   if let symbolEffect = value as? [String: Any] {
          //     let type = symbolEffect["type"] as? String ?? "bounce"
          //     let repeatCount = symbolEffect["repeatCount"] as? Int
          //     let speed = symbolEffect["speed"] as? Double
          //     let reversing = symbolEffect["reversing"] as? Bool
          //     let direction = symbolEffect["direction"] as? String
          //     let animateBy = symbolEffect["animateBy"] as? String
          //     let inactiveLayers = symbolEffect["inactiveLayers"] as? String
          //     let value = symbolEffect["value"]
          //     let isActive = symbolEffect["isActive"] as? Bool ?? false
          //     view = AnyView(
          //       view.modifier(
          //         SymbolEffectModifier(
          //           symbolEffect: SFSymbolEffect(
          //             type: type,
          //             repeatCount: repeatCount,
          //             speed: speed,
          //             reversing: reversing,
          //             direction: direction,
          //             animateBy: animateBy,
          //             inactiveLayers: inactiveLayers,
          //             value: value,
          //             isActive: isActive
          //           )
          //         )
          //       )
          //     )
          //   }
           

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

func convertProcessedColorToUIColor(from value: Any?) -> UIColor {
  do {
    return try UIColor.convert(from: value, appContext: AppContext())
  } catch _  {
    return UIColor.black
  }
}


func getColor(_ color: Any?) -> UIColor {
  if let color = color as? String {
    let selector: Selector
    if color.hasSuffix("Color") {
      selector = Selector(color)
    } else {
      selector = Selector("\(color)Color")
    }
    if UIColor.responds(to: selector) {
      return UIColor.perform(selector).takeUnretainedValue() as! UIColor
    } else {
      return convertProcessedColorToUIColor(from: color) as UIColor
    }
  }
  return convertProcessedColorToUIColor(from: color) as UIColor
}

