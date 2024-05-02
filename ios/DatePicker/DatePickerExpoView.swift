import ExpoModulesCore
import SwiftUI

class DatePickerExpoView: ExpoView {
  let props: DatePickerProps
  let onEvent = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = DatePickerProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: DatePickerView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
