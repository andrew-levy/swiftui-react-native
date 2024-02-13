import ExpoModulesCore
import SwiftUI

class DatePickerExpoView: ExpoView {
  let props: DatePickerProps
  let onValueChange = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = DatePickerProps(onValueChange: onValueChange)
    let hostingController = UIHostingController(rootView: DatePickerView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
