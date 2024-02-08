import ExpoModulesCore
import SwiftUI

class PickerExpoView: ExpoView {
  let props: PickerProps
  let onSized = EventDispatcher()
  let onValueChange = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = PickerProps(onSized: onSized, onValueChange: onValueChange)
    let hostingController = UIHostingController(rootView: PickerView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
