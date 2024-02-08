import ExpoModulesCore
import SwiftUI

class ProgressExpoView: ExpoView {
  let props: ProgressProps
  let onSized = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = ProgressProps(onSized: onSized)
    let hostingController = UIHostingController(rootView: ProgressViewView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
