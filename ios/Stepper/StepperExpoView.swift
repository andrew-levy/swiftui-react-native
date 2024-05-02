import ExpoModulesCore
import SwiftUI

class StepperExpoView: ExpoView {
  let props: StepperProps
  let onEvent = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = StepperProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: StepperView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
