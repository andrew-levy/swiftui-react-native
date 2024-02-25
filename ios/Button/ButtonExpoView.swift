import ExpoModulesCore
import SwiftUI

class ButtonExpoView: ExpoView {
  let props: ButtonProps
  let onEvent = EventDispatcher()
  
  override func didUpdateReactSubviews() {
    let subChildren = self.reactSubviews()
    props.children = subChildren
  }
  
  required init(appContext: AppContext? = nil) {
    props = ButtonProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: ButtonView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
