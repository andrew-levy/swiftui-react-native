import ExpoModulesCore
import SwiftUI

class TextFieldExpoView: ExpoView {
  let props: TextFieldProps
  let onEvent = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = TextFieldProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: TextFieldView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
