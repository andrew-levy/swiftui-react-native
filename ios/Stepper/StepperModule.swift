import ExpoModulesCore

public class StepperModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Stepper")
    View(StepperExpoView.self) {
      Events("onValueChange")
      Prop("value") { (view: StepperExpoView, prop: Double) in
        view.props.value = prop
      }
      Prop("range") { (view: StepperExpoView, prop: [Double]) in
        view.props.range = prop
      }
      Prop("step") { (view: StepperExpoView, prop: Double) in
        view.props.step = prop
      }
      Prop("label") { (view: StepperExpoView, prop: String?) in
        view.props.labelText = prop
      }
      Prop("modifiers") { (view: StepperExpoView, prop: [[String: Any]]) in
        view.props.modifiers = prop
      }
    }
  }
}
