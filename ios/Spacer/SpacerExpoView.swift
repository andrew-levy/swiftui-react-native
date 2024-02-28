import ExpoModulesCore
import SwiftUI

class SpacerExpoView: ExpoView {
  let props: SpacerProps
  let onEvent = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = SpacerProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: SpacerView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
