import ExpoModulesCore
import SwiftUI

class ZStackExpoView: ExpoView {
  let props: ZStackProps
  let onEvent = EventDispatcher()

  override func didUpdateReactSubviews() {
    let subChildren = self.reactSubviews()
    props.children = subChildren
  }
  
  required init(appContext: AppContext? = nil) {
    props = ZStackProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: ZStackView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
