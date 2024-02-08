import ExpoModulesCore
import SwiftUI

class ToggleExpoView: ExpoView {
  let props: ToggleProps
  let onValueChange = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = ToggleProps(onValueChange: onValueChange)
    let hostingController = UIHostingController(rootView: ToggleView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
