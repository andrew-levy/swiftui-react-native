import ExpoModulesCore
import SwiftUI

class StepperExpoView: ExpoView {
  let props: StepperProps
  let onValueChange = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = StepperProps(onValueChange: onValueChange)
    let hostingController = UIHostingController(rootView: StepperView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
