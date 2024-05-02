import ExpoModulesCore
import SwiftUI

class PickerExpoView: ExpoView {
  let props: PickerProps
  let onEvent = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = PickerProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: PickerView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
