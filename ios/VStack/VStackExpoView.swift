import ExpoModulesCore
import SwiftUI

class VStackExpoView: ExpoView {
  let props: VStackProps
  let onEvent = EventDispatcher()

  override func didUpdateReactSubviews() {
    let subChildren = self.reactSubviews()
    props.children = subChildren
  }
  
  required init(appContext: AppContext? = nil) {
    props = VStackProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: VStackView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
