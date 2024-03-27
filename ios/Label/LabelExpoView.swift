import ExpoModulesCore
import SwiftUI

class LabelExpoView: ExpoView {
  let props: LabelProps
  let onEvent = EventDispatcher()
  
  override func didUpdateReactSubviews() {
    _ = self.reactSubviews()
  }

  required init(appContext: AppContext? = nil) {
    props = LabelProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: LabelView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
