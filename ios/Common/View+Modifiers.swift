
import SwiftUI
import ExpoModulesCore

extension View {
  func reactNativeViewModifiers(
    mods: [[String: Any]],
    lifecycleModifier: LifecycleModifier? = nil,
    sheetModifier: SheetModifier? = nil
  ) -> some View {
    modifier(
      ReactNativeViewModifiers(
        mods: mods,
        lifecycleModifier: lifecycleModifier,
        sheetModifier: sheetModifier
      )
    )
  }
}

struct ReactNativeViewModifiers: ViewModifier {
  var mods: [[String: Any]]
  var lifecycleModifier: LifecycleModifier? = nil
  var sheetModifier: SheetModifier? = nil
  
  func body(content: Content) -> some View {
    var view = AnyView(content)
    for mod in mods {
      for (key, value) in mod {
        switch(key) {
        case "padding":
          if value is Bool {
            view = AnyView(view.padding())
          } else if let padding = value as? CGFloat {
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
            if let color = getColor(border["color"]) as Color?, let width = border["width"] as? CGFloat {
              view = AnyView(view.border(color, width: width))
            }
          }

        case "tag":
          if let tag = value as? Int {
            view = AnyView(view.tag(tag))
          } else if let tag = value as? String {
            view = AnyView(view.tag(tag))
          }

        case "foregroundStyle":
          if let color = getColor(value) as Color? {
            if #available(iOS 15.0, *) {
              view = AnyView(view.foregroundStyle(color))
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
          // Currently only supports color
        case "background":
          if let color = getColor(value) as Color? {
            view = AnyView(view.background(color))
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
            if let color = getColor(shadow["color"]) as Color?, let radius = shadow["radius"] as? CGFloat, let x = shadow["x"] as? CGFloat, let y = shadow["y"] as? CGFloat {
              view = AnyView(view.shadow(color: color, radius: radius, x: x, y: y))
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
          // Currently only supports text mask
        case "mask":
          if let mask = value as? String {
            if #available(iOS 15.0, *) {
              view = AnyView(view.mask({
                Text(mask)
              }))
            }
          }
          // Currently only supports direct mapping to shapes
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
            case "caption2":
              if #available(iOS 14.0, *) {
                view = AnyView(view.font(.caption2))
              }
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
            case "title2":
              if #available(iOS 14.0, *) {
                view = AnyView(view.font(.title2))
              }
            case "title3":
              if #available(iOS 14.0, *) {
                view = AnyView(view.font(.title3))
              }
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
          if let color = getColor(value) as Color? {
            if #available(iOS 16.0, *) {
              view = AnyView(view.tint(color))
            } else {
              view = AnyView(view.accentColor(color))
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
          
        case "presentationCornerRadius":
          if let cornerRadius = value as? CGFloat {
            if #available(iOS 16.4, *) {
              view = AnyView(view.presentationCornerRadius(cornerRadius))
            }
          }
          
        case "presentationDetents":
          if let presentationDetents = value as? [Any] {
            if #available(iOS 16.0, *) {
              var detents: Set<PresentationDetent> = []
              for detent in presentationDetents {
                if let detent = detent as? String {
                  switch detent {
                  case "medium":
                    detents.insert(.medium)
                  case "large":
                    detents.insert(.large)
                  default:
                    break
                  }
                } else if let detent = detent as? [String: Any] {
                  if let fraction = detent["fraction"] as? CGFloat {
                    detents.insert(.fraction(fraction))
                  } else if let height = detent["height"] as? CGFloat {
                    detents.insert(.height(height))
                  }
                }
              }
              view = AnyView(view.presentationDetents(detents))
            }
          }
          
          
        case "sensoryFeedback":
          if let sensoryFeedback = value as? [String: Any],
             let feedback = sensoryFeedback["feedback"] as? String,
             let trigger = sensoryFeedback["trigger"] as? any Equatable {
            if #available(iOS 17.0, *) {
              switch feedback {
              case "warning":
                view = AnyView(view.sensoryFeedback(.warning, trigger: trigger))
              case "error":
                view = AnyView(view.sensoryFeedback(.error, trigger: trigger))
              case "success":
                view = AnyView(view.sensoryFeedback(.success, trigger: trigger))
              case "alignment":
                view = AnyView(view.sensoryFeedback(.alignment, trigger: trigger))
              case "decrease":
                view = AnyView(view.sensoryFeedback(.decrease, trigger: trigger))
              case "impact":
                view = AnyView(view.sensoryFeedback(.impact, trigger: trigger))
              case "increase":
                view = AnyView(view.sensoryFeedback(.increase, trigger: trigger))
              case "levelChange":
                view = AnyView(view.sensoryFeedback(.levelChange, trigger: trigger))
              case "selection":
                view = AnyView(view.sensoryFeedback(.selection, trigger: trigger))
              case "start":
                view = AnyView(view.sensoryFeedback(.start, trigger: trigger))
              case "stop":
                view = AnyView(view.sensoryFeedback(.stop, trigger: trigger))
              default:
                break
              }
            }
          }
          
        case "listStyle":
          if let listStyle = value as? String {
            switch listStyle {
            case "grouped":
              view = AnyView(view.listStyle(.grouped))
            case "inset":
              if #available(iOS 14.0, *) {
                view = AnyView(view.listStyle(.inset))
              }
            case "insetGrouped":
              if #available(iOS 14.0, *) {
                view = AnyView(view.listStyle(.insetGrouped))
              }
            case "sidebar":
              if #available(iOS 14.0, *) {
                view = AnyView(view.listStyle(.sidebar))
              }
            case "plain":
              if #available(iOS 14.0, *) {
                view = AnyView(view.listStyle(.plain))
              }
            default:
              break
            }
          }
      
          

          case "scrollDisabled":
            if let scrollDisabled = value as? Bool {
              if scrollDisabled {
                if #available(iOS 16.0, *) {
                  view = AnyView(view.scrollDisabled(scrollDisabled))
                }
              }
            }
          
          
        case "textFieldStyle":
          if let textFieldStyle = value as? String {
            switch textFieldStyle {
            case "roundedBorder":
              view = AnyView(view.textFieldStyle(.roundedBorder))
            case "plain":
              view = AnyView(view.textFieldStyle(.plain))
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
          
        case "position":
          if let position = value as? [String: Any] {
            if let x = position["x"] as? CGFloat, let y = position["y"] as? CGFloat {
              view = AnyView(view.position(x: x, y: y))
            }
          }
          
        case "offset":
          if let offset = value as? [String: Any] {
            if let x = offset["x"] as? CGFloat, let y = offset["y"] as? CGFloat {
              view = AnyView(view.offset(x: x, y: y))
            }
          }
          
        case "onAppear":
          view = AnyView(view.onAppear {
            lifecycleModifier?.onAppear()
          })
          
        case "onDisappear":
          view = AnyView(view.onDisappear {
            lifecycleModifier?.onDisappear()
          })
          
        case "sheet":
          view = AnyView(view.sheet(isPresented: sheetModifier?.isSheetPresented ?? .constant(false), onDismiss: {
            sheetModifier?.onSheetDismissed()
          }) {
            if #available(iOS 16.0, *) {
              RepresentableView(view: sheetModifier?.sheetContent ?? UIView())
                .frame(width: sheetModifier?.sheetContent.frame.width, height: sheetModifier?.sheetContent.frame.height)
            }
          })
          
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


//func getColor(_ color: Any?) -> UIColor {
//  if let color = color as? String {
//    let selector: Selector
//    if color.hasSuffix("Color") {
//      selector = Selector(color)
//    } else {
//      selector = Selector("\(color)Color")
//    }
//    if UIColor.responds(to: selector) {
//      return UIColor.perform(selector).takeUnretainedValue() as! UIColor
//    } else {
//      return convertProcessedColorToUIColor(from: color) as UIColor
//    }
//  }
//  return convertProcessedColorToUIColor(from: color) as UIColor
//}

func getColor(_ color: Any?) -> Color {
  if let color = color as? String {
    switch color {
    case "blue":
      return .blue
    case "red":
      return .red
    case "green":
      return .green
    case "yellow":
      return .yellow
    case "orange":  
      return .orange
    case "purple":
      return .purple
    case "pink":
      return .pink
    case "primary":
      return .primary
    case "secondary":
      return .secondary
    case "accentColor":
      return .accentColor
    case "black":
      return .black
    case "white":
      return .white
    case "gray":
      return .gray
    case "clear":
      return .clear
    case "mint":
      if #available(iOS 15.0, *) {
        return .mint
      }
    case "brown":
      if #available(iOS 15.0, *) {
        return .brown
      }
    case "teal":
      if #available(iOS 15.0, *) {
        return .teal
      }
    case "cyan":
      if #available(iOS 15.0, *) {
        return .cyan
      }

    case "indigo":
      if #available(iOS 15.0, *) {
        return .indigo
      }

      
    default:
      if #available(iOS 15.0, *) {
        return Color(uiColor: convertProcessedColorToUIColor(from: color))
      } else {
        return .clear
      }
    }
  }
  if #available(iOS 15.0, *) {
    return Color(uiColor: convertProcessedColorToUIColor(from: color))
  } else {
    return .clear
  }
}


struct LifecycleModifier {
  var onAppear: EventDispatcher
  var onDisappear: EventDispatcher
}

struct SheetModifier {
  var onSheetDismissed: EventDispatcher
  var isSheetPresented: Binding<Bool>
  var sheetContent: UIView
}
