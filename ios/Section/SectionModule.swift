import ExpoModulesCore
import SwiftUI

public class SectionModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Section")
    View(SectionExpoView.self) {
      Events("onEvent")
      Prop("modifiers") { (view: SectionExpoView, prop: [[String: Any]]) in
         view.props.modifiers = prop
      }
      Prop("header") { (view: SectionExpoView, prop: String) in
        view.props.header = prop
      }
      Prop("footer") { (view: SectionExpoView, prop: String) in
        view.props.footer = prop
      }
    }
  }
}
