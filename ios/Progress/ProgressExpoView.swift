import ExpoModulesCore
import SwiftUI

class ProgressExpoView: ExpoView {
  let props: ProgressProps
  let onEvent = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = ProgressProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: ProgressViewView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
