import ExpoModulesCore
import SwiftUI

class DividerExpoView: ExpoView {
  let props: DividerProps
  let onEvent = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = DividerProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: DividerView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
