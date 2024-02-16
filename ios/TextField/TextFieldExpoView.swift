import ExpoModulesCore
import SwiftUI

class TextFieldExpoView: ExpoView {
  let props: TextFieldProps
  let onSized = EventDispatcher()
  let onValueChange = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = TextFieldProps(onValueChange: onValueChange)
    let hostingController = UIHostingController(rootView: TextFieldView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
