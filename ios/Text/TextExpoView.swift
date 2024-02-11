import ExpoModulesCore
import SwiftUI

class TextExpoView: ExpoView {
  let props: TextProps
  let onSized = EventDispatcher()

  required init(appContext: AppContext? = nil) {
    props = TextProps(onSized: onSized)
    let hostingController = UIHostingController(rootView: TextView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
