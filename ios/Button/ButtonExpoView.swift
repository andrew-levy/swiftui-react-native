import ExpoModulesCore
import SwiftUI

class ButtonExpoView: ExpoView {
  let props: ButtonProps
  let onAction = EventDispatcher()
  
  override func didUpdateReactSubviews() {
    let subChildren = self.reactSubviews()
    props.children = subChildren
  }
  
  required init(appContext: AppContext? = nil) {
    props = ButtonProps(onAction: onAction)
    let hostingController = UIHostingController(rootView: ButtonView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
