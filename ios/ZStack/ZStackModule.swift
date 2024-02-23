import ExpoModulesCore
import SwiftUI

public class ZStackModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ZStack")
    View(ZStackExpoView.self) {
      Prop("alignment") { (view: ZStackExpoView, prop: String?) in
        switch prop {
        case "topLeading": view.props.alignment = .topLeading
        case "top": view.props.alignment = .top
        case "topTrailing": view.props.alignment = .topTrailing
        case "leading":  view.props.alignment = .leading
        case "center": view.props.alignment = .center
        case "trailing": view.props.alignment = .trailing
        case "bottomLeading": view.props.alignment = .bottomLeading
        case "bottom": view.props.alignment = .bottom
        case "bottomTrailing": view.props.alignment = .bottomTrailing
        default: view.props.alignment = .center
        }
      }
      Prop("modifiers") { (view: ZStackExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
