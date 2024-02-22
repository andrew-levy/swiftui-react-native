import ExpoModulesCore
import SwiftUI

class PickerExpoView: ExpoView {
  let props: PickerProps
  let onValueChange = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = PickerProps(onValueChange: onValueChange)
    let hostingController = UIHostingController(rootView: PickerView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
