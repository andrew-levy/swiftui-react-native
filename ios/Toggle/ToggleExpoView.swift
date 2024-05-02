import ExpoModulesCore
import SwiftUI

class ToggleExpoView: ExpoView {
  let props: ToggleProps
  let onEvent = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = ToggleProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: ToggleView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
