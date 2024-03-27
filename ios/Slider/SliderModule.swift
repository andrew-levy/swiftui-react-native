import ExpoModulesCore

public class SliderModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Slider")
    View(SliderExpoView.self) {
      Events("onEvent")
      Prop("value") { (view: SliderExpoView, prop: Double) in
        view.props.value = prop
      }
      Prop("range") { (view: SliderExpoView, prop: [Double]) in
        view.props.range = prop
      }
      Prop("step") { (view: SliderExpoView, prop: Double) in
        view.props.step = prop
      }
      Prop("label") { (view: SliderExpoView, prop: String?) in
        view.props.labelText = prop
      }
      Prop("modifiers") { (view: SliderExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
